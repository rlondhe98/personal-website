// ============================================================
// SINGLE SOURCE OF TRUTH — edit this file only.
// Every change here automatically updates:
//   1. The website (rendered live via js/render.js)
//   2. The downloadable PDF (generated via js/resume-pdf.js)
// ============================================================

window.RESUME_DATA = {
  name: "Rohan Londhe",
  title: "Data Integration Engineer (MuleSoft)",
  location: "Bengaluru, India",
  email: "rlondhe4561@gmail.com",
  phone: "+91 98196 98374",
  linkedin: "www.linkedin.com/in/rohanlondhe",
  linkedinUrl: "https://www.linkedin.com/in/rohanlondhe",
  trailblazer: "www.salesforce.com/trailblazer/rohan-londhe",
  trailblazerUrl: "https://www.salesforce.com/trailblazer/rohan-londhe",

  summary: "Certified MuleSoft developer with over 6 years of experience designing and building robust API integrations. Expertise spans integrating platforms including Salesforce, SendGrid, and more. Passionate about leveraging MuleSoft to create seamless, efficient solutions that drive business success.",

  // Add or remove skill chips freely. "group" controls the hover-highlight
  // clustering on the site (chips in the same group light up together).
  // Groups in use: "core", "platform", "ops" — reuse these or invent a new one.
  skills: [
    { name: "MuleSoft", group: "core" },
    { name: "Anypoint Platform", group: "core" },
    { name: "REST APIs", group: "core" },
    { name: "DataWeave 2.0", group: "core" },
    { name: "API Design", group: "core" },
    { name: "API-Led Connectivity", group: "core" },
    { name: "MUnit", group: "core" },
    { name: "Integration Design", group: "core" },
    { name: "System Thinking", group: "core" },
    { name: "Salesforce Health Cloud", group: "platform" },
    { name: "Agentforce", group: "platform" },
    { name: "HashiCorp Vault", group: "ops" },
    { name: "Splunk", group: "ops" },
    { name: "Event-driven Architecture", group: "ops" }
  ],

  // Newest experience first. Add a new object at the top of this array for a new job.
  experience: [
    {
      role: "Data Integration Engineer (MuleSoft)",
      company: "Takeda Innovations India Private Limited",
      location: "Bengaluru",
      dates: "May 2024 - Present",
      bullets: [
        "Transitioned from an external consulting role to join Takeda as a full-time Senior MuleSoft Developer, reflecting direct recognition of technical contributions delivered during the engagement",
        "Continued to own and evolve the enterprise integration landscape, driving stability, performance, and scalability of mission-critical MuleSoft APIs across the organization",
        "Collaborated closely with internal business and technology stakeholders to align integration architecture with evolving Salesforce Health Cloud and CRM roadmap requirements",
        "Took on expanded ownership of the HCP onboarding and data synchronization pipelines, ensuring continuous improvement and reliability of key pharmaceutical commercial processes",
        "Pioneered the adoption of AI-assisted development practices in day-to-day project activities, leveraging AI tools to accelerate integration design, code generation, documentation, and troubleshooting",
        "Built a custom AI-powered utility to migrate existing MuleSoft applications from Secure Properties to HashiCorp Vault, automating the transition to enterprise-grade secrets management",
        "Designed and deployed a custom Splunk dashboard to generate real-time operational metrics around the HCP onboarding pipeline, including lead creation volumes, auto-match rates, and qualification trends"
      ]
    },
    {
      role: "Senior Software Engineer",
      company: "Accenture Solutions Pvt. Ltd.",
      location: "Mumbai",
      dates: "Nov 2021 - May 2024",
      bullets: [
        "Spearheaded integration development for a global pharmaceutical client, architecting enterprise-grade MuleSoft solutions across Salesforce Health Cloud, SendGrid, SpotMe, and OneTrust",
        "Designed and delivered API-Led RESTful APIs following Experience, Process, and System layer architecture, enabling seamless integration between mobile applications and Salesforce Health Cloud",
        "Built robust file-based integrations using event-driven patterns to reliably sync high-volume data from external vendors into Salesforce Health Cloud",
        "Engineered end-to-end HCP onboarding APIs into Salesforce CRM, incorporating automated matching logic, lead generation workflows, and lead qualification processes",
        "Drove a 30% reduction in lead creation time and manual qualification effort by integrating IQVIA data into the HCP matching process",
        "Ensured compliance and data privacy adherence across integrations by working within OneTrust governance frameworks"
      ]
    },
    {
      role: "Software Engineer",
      company: "LTIMindtree Ltd.",
      location: "Mumbai",
      dates: "Aug 2019 - Nov 2021",
      bullets: [
        "Embarked on a career as a MuleSoft Developer, gaining hands-on expertise in the Anypoint Platform, integration design, and API lifecycle management within a financial services domain",
        "Developed RESTful APIs following API-Led Connectivity principles, structuring solutions across Experience, Process, and System layers",
        "Designed and implemented file-based integrations leveraging event-driven architecture patterns for reliable, asynchronous processing of high-volume data exchanges",
        "Contributed to the end-to-end integration of core financial systems, ensuring secure, compliant, and performant data flows",
        "Awarded GoMx Phoenix award for excellent ownership, dedication and trust"
      ]
    }
  ],

  education: [
    {
      degree: "Bachelor's Degree, Information Technology Engineering",
      school: "Pillai College Of Engineering, New Panvel, Mumbai",
      dates: "2015 - 2019",
      detail: "GPA: 7.75"
    }
  ],

  // "featured" certifications get the large badge-card treatment on the site.
  // Non-featured ones render as small chips under "Superbadges".
  // badgeImage: path to the badge artwork in assets/badges/ (leave "" to use a generated icon instead — used for status tiers like Agentblazer).
  // verifyUrl: where the badge links to when clicked — defaults to your Trailblazer profile.
  certifications: [
    {
      name: "Salesforce Certified MuleSoft Developer II",
      date: "Apr 2023",
      featured: true,
      badgeImage: "assets/badges/mulesoft-developer-ii.jpg",
      verifyUrl: "https://www.salesforce.com/trailblazer/rohan-londhe"
    },
    {
      name: "Salesforce Certified Agentforce Specialist",
      date: "Sep 2025",
      featured: true,
      badgeImage: "assets/badges/agentforce-specialist.jpg",
      verifyUrl: "https://www.salesforce.com/trailblazer/rohan-londhe"
    },
    {
      name: "Salesforce Certified MuleSoft Developer",
      date: "Jul 2020",
      featured: true,
      badgeImage: "assets/badges/mulesoft-developer.jpg",
      verifyUrl: "https://www.salesforce.com/trailblazer/rohan-londhe"
    },
    {
      name: "Agentblazer Legend",
      date: "2025 & 2026",
      featured: true,
      badgeImage: "assets/badges/agentblazer-legend.jpg",
      verifyUrl: "https://www.salesforce.com/trailblazer/rohan-londhe"
    },
    {
      name: "Apex for Agentforce",
      date: "",
      featured: false,
      badgeImage: "",
      verifyUrl: "https://www.salesforce.com/trailblazer/rohan-londhe"
    },
    {
      name: "Advanced Flow for Agentforce",
      date: "",
      featured: false,
      badgeImage: "",
      verifyUrl: "https://www.salesforce.com/trailblazer/rohan-londhe"
    },
    {
      name: "Agentforce Service",
      date: "",
      featured: false,
      badgeImage: "",
      verifyUrl: "https://www.salesforce.com/trailblazer/rohan-londhe"
    },
    {
      name: "Prompt Builder Templates",
      date: "",
      featured: false,
      badgeImage: "",
      verifyUrl: "https://www.salesforce.com/trailblazer/rohan-londhe"
    }
  ],

  // Impact / case study cards shown between Experience and Skills.
  // "value" + "suffix" drive the animated counting number (e.g. value: 30, suffix: "%").
  caseStudies: [
    {
      tag: "Salesforce Health Cloud · HCP Onboarding",
      value: 30,
      suffix: "%",
      metricLabel: "Reduction in lead creation & qualification time",
      problem: "Manual HCP matching and lead qualification created bottlenecks in the pharmaceutical onboarding pipeline.",
      approach: "Integrated IQVIA data directly into the HCP matching engine, automating lead generation and qualification logic within Salesforce CRM.",
      result: "Cut manual qualification effort significantly while improving data accuracy across the onboarding lifecycle."
    },
    {
      tag: "Security & Secrets Management",
      value: 100,
      suffix: "%",
      metricLabel: "Migration from Secure Properties to HashiCorp Vault",
      problem: "Legacy MuleSoft applications relied on Secure Properties, limiting enterprise-grade secrets governance.",
      approach: "Built a custom AI-assisted migration utility to automate the transition of existing applications to HashiCorp Vault.",
      result: "Improved the security posture of the entire integration landscape without manual, app-by-app rework."
    }
  ]
};
