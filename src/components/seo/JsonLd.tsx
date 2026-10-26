import { PARTH_PROFILE } from "@/content/parthContent";

export function JsonLd() {
  const siteUrl = "https://parthkashyap.web.app";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: PARTH_PROFILE.name,
        givenName: PARTH_PROFILE.firstName,
        familyName: PARTH_PROFILE.lastName,
        url: siteUrl,
        image: `${siteUrl}/hero-silhouette.png`,
        jobTitle: "PCB Stream Scholar & Pre-Medical Student",
        description: PARTH_PROFILE.summary,
        knowsAbout: [
          "Physics, Chemistry, and Biology (PCB)",
          "Human Physiology & Endocrine Systems",
          "Genetics, Molecular Biology & Inheritance",
          "Cell Biology & Cytology",
          "Organic Chemistry Reaction Mechanisms",
          "Biomolecules: Proteins, Carbohydrates, DNA",
          "Coordination Chemistry & Periodic Trends",
          "Ray & Wave Optics",
          "Electromagnetism & Current Electricity",
          "Pre-Medical Sciences & NEET Curriculum",
        ],
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Senior Secondary Education",
          educationalLevel: "Class 12 Senior Secondary",
          about: "Physics, Chemistry & Biology (PCB)",
        },
        nationality: {
          "@type": "Country",
          name: "India",
        },
        homeLocation: {
          "@type": "Place",
          name: PARTH_PROFILE.location,
        },
        sameAs: [siteUrl, "https://parthkashyap.in"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: `${PARTH_PROFILE.name} | PCB Stream, Science & Pre-Med Portfolio`,
        description: `Official academic and pre-medical science portfolio of ${PARTH_PROFILE.name}, Class 12 PCB student focused on biology, chemistry, and physics conceptual rigor.`,
        inLanguage: "en-US",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
        creator: {
          "@type": "Person",
          name: "Piyush Ratan",
          url: "https://piyushratan.in",
        },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name: `${PARTH_PROFILE.name} - Pre-Med & PCB Portfolio`,
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        mainEntity: {
          "@id": `${siteUrl}/#person`,
        },
        audience: {
          "@type": "EducationalAudience",
          educationalRole: "student",
          audienceType:
            "Medical Aspirants, Educators, Academic Mentors & Pre-Med Evaluators",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
