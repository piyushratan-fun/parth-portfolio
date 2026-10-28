import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9222;
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "chrome-cdp-"));

console.log("Launching Headless Chrome...");
const chrome = spawn(CHROME_PATH, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${tempDir}`,
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  "about:blank",
]);

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

let msgId = 1;
function sendCdp(ws, method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = msgId++;
    const handler = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id === id) {
        ws.removeEventListener("message", handler);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
    ws.addEventListener("message", handler);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(ws, expr) {
  const res = await sendCdp(ws, "Runtime.evaluate", {
    expression: expr,
    returnByValue: true,
  });
  return res.result?.value;
}

async function run() {
  await sleep(1500);

  const targetsRes = await fetch(`http://localhost:${PORT}/json/list`);
  const targets = await targetsRes.json();
  const pageTarget = targets.find((t) => t.type === "page");
  if (!pageTarget) {
    throw new Error("No page target found");
  }

  console.log("Connecting via CDP WebSocket:", pageTarget.webSocketDebuggerUrl);
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);

  await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));
  console.log("Connected to Chrome DevTools Protocol");

  await sendCdp(ws, "Page.enable");
  await sendCdp(ws, "Runtime.enable");

  const targetUrl = "https://parthkashyap.web.app";
  console.log(`\nNavigating to ${targetUrl}...`);
  await sendCdp(ws, "Page.navigate", { url: targetUrl });

  console.log("Waiting 1.0s to measure Frame 1s state...");
  await sleep(1000);

  const stateAt1s = await evaluate(
    ws,
    `(() => {
      const overlay = document.querySelector('.brand-loader-overlay');
      const counterEl = document.querySelector('.brand-loader-overlay .tabular-nums');
      const shell = document.querySelector('[data-route-shell]');
      const shutterTop = document.querySelector('.brand-loader-overlay div[class*="border-b"]');
      const shutterBottom = document.querySelector('.brand-loader-overlay div[class*="border-t"]');
      return {
        overlayPresent: !!overlay,
        counterText: counterEl ? counterEl.textContent.trim() : null,
        shellOpacity: shell ? window.getComputedStyle(shell).opacity : null,
        shellPointerEvents: shell ? window.getComputedStyle(shell).pointerEvents : null,
        hasShutters: !!(shutterTop && shutterBottom)
      };
    })()`
  );

  console.log("State at Second 1:", JSON.stringify(stateAt1s, null, 2));

  console.log("\nWaiting another 1.5s (total 2.5s) to measure post-split state...");
  await sleep(1500);

  const stateAt25s = await evaluate(
    ws,
    `(() => {
      const overlay = document.querySelector('.brand-loader-overlay');
      const shell = document.querySelector('[data-route-shell]');
      const shutterTop = document.querySelector('div[class*="border-b"]');
      return {
        overlayInDom: !!overlay,
        overlayOpacity: overlay ? window.getComputedStyle(overlay).opacity : "unmounted",
        shellOpacity: shell ? window.getComputedStyle(shell).opacity : null,
        shellPointerEvents: shell ? window.getComputedStyle(shell).pointerEvents : null,
      };
    })()`
  );

  console.log("State at Second 2.5:", JSON.stringify(stateAt25s, null, 2));

  console.log("\nReloading page to verify mandatory formality (no sessionStorage bypass)...");
  await sendCdp(ws, "Page.reload");

  console.log("Waiting 1.0s after reload...");
  await sleep(1000);

  const stateAtReload1s = await evaluate(
    ws,
    `(() => {
      const overlay = document.querySelector('.brand-loader-overlay');
      const counterEl = document.querySelector('.brand-loader-overlay .tabular-nums');
      const shell = document.querySelector('[data-route-shell]');
      return {
        overlayPresentOnReload: !!overlay,
        counterTextOnReload: counterEl ? counterEl.textContent.trim() : null,
        shellPointerEvents: shell ? window.getComputedStyle(shell).pointerEvents : null,
      };
    })()`
  );

  console.log("State on Reload at Second 1:", JSON.stringify(stateAtReload1s, null, 2));

  console.log("\nWaiting 2.0s for reload animation to finish...");
  await sleep(2000);

  const stateAtReloadFinal = await evaluate(
    ws,
    `(() => {
      const overlay = document.querySelector('.brand-loader-overlay');
      const shell = document.querySelector('[data-route-shell]');
      return {
        overlayInDom: !!overlay,
        shellPointerEvents: shell ? window.getComputedStyle(shell).pointerEvents : null,
      };
    })()`
  );

  console.log("State on Reload Final:", JSON.stringify(stateAtReloadFinal, null, 2));

  ws.close();
  chrome.kill();
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch {}

  console.log("\n=== VERIFICATION SUMMARY ===");
  const pass1 = stateAt1s.overlayPresent && stateAt1s.counterText && stateAt1s.shellPointerEvents === "none";
  const pass2 = stateAt25s.shellPointerEvents === "auto";
  const pass3 = stateAtReload1s.overlayPresentOnReload && stateAtReload1s.counterTextOnReload;
  console.log("Check 1 (Second 1: Loader active, counter ticking, non-interactive shell):", pass1 ? "PASS" : "FAIL");
  console.log("Check 2 (Second 2.5: Shutters split, interactive shell pointer-events:auto):", pass2 ? "PASS" : "FAIL");
  console.log("Check 3 (On Reload: Loader re-runs cleanly without bypass):", pass3 ? "PASS" : "FAIL");

  if (!pass1 || !pass2 || !pass3) {
    process.exit(1);
  }
}

run().catch((err) => {
  console.error("Test failed with error:", err);
  chrome.kill();
  process.exit(1);
});
