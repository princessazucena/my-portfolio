export const PERSONAL_INFO = {
  name: "Princess Anne B. Azucena",
  preferredName: "Princess Azucena",
  title: "Full-Stack Engineer & IT Specialist",
  tagline: "Building scalable backend platforms, resilient cloud systems, and clean modern web interfaces.",
  location: "Majayjay, Laguna, Philippines",
  status: "Available for Projects & Full-Time Roles",
  bio: "An IT scholar and software engineer with a strong foundation in modern system architectures and continuous technical mastery. Specializing in high-performance web systems, cloud infrastructure, enterprise operations, and clean human-centric interfaces.",
  stats: [
    { label: "Production Systems", value: "5+", sub: "Engineered & Deployed" },
    { label: "Core Technologies", value: "12+", sub: "Python, Flask, React, Cloud" },
    { label: "System Reliability", value: "99.9%", sub: "Resilient & Tested" },
    { label: "Degree & Major", value: "BSIT", sub: "Info Tech & SysAdmin" },
  ],
  socials: {
    github: "https://github.com/princessazucena",
    linkedin: "https://www.linkedin.com/in/azucena-princess-anne-b-30316a368",
    facebook: "https://www.facebook.com/princessanne.balalaazucena/",
    instagram: "https://www.instagram.com/shobeprncxx_/",
    email: "ceaneazucena@gmail.com",
  },
  credentialsBadge: "BSIT • Majayjay Laguna • System Admin & Full-Stack"
};

export const PROJECTS_DATA = [
  {
    id: "eb-delacruz",
    title: "E.B. Dela Cruz Operations & Dispatch System",
    category: "Full-Stack & Cloud",
    type: "Enterprise Capstone Platform",
    featured: true,
    summary: "Enterprise electrical contracting & operations platform featuring an AI system assistant, live GPS electrician tracking, an applicant chatbot (Ebby), an AI text enhancer, real-time messaging, and automated SMS gateway notifications.",
    architecture: "Python 3.11 (Flask), AI Query Engine & Report Generator, Leaflet/Mapbox Live Geolocation, Docker, Firebase/Firestore, Flutter Mobile, SMS Gateway API, OpenCV Biometrics",
    description: "An enterprise-grade operational management and electrical service platform engineered for contractor dispatching, live field electrician GPS tracking, multi-role communication, and AI-powered automation. Features an intelligent AI Assistant that generates automated reports, redirects system page routes, and answers queries on system data; a Live Job Order Map for real-time dispatching; an Applicant Chatbot ('Ebby'); an AI Text Enhancer for formal input refinement; and an integrated in-app messaging & SMS gateway notification engine.",
    highlights: [
      "AI Assistant & Report Generator: Autonomous AI agent that generates analytical reports, executes smart page route redirections, and answers complex queries regarding system data.",
      "Live Job Order Map: Interactive real-time geospatial map tracking field electricians, service zones, and active job order dispatch statuses.",
      "Applicant Chatbot ('Ebby'): Conversational AI assistant guiding clients and applicants through service requirements, estimates, and registration workflows.",
      "AI Text Generator & Enhancer: AI-driven text refinement tool optimizing user input formatting, formalizing reasons, and structuring communication.",
      "Messaging & SMS Gateway Engine: Dual-channel in-app direct messaging and automated SMS dispatch alerts for field technicians and clients.",
      "Biometric Face Matching & RBAC: OpenCV facial recognition security safeguarding access across Admin, Secretary, Electrician, and Customer portals."
    ],
    screenshots: [
      {
        id: "eb-landing",
        title: "Contractor Portal & Service Showcase",
        caption: "Landing interface displaying Meralco accreditation, instant service estimations, and contractor consultation booking.",
        image: "/projects/eb-delacruz/eb-landing.png"
      },
      {
        id: "eb-live-map",
        title: "Live Job Order & Electrician Map",
        caption: "Real-time geospatial tracking interface monitoring active field electricians and job order dispatches across Laguna service zones.",
        image: "/projects/eb-delacruz/eb-live-map.png"
      },
      {
        id: "eb-ai-enhancer",
        title: "AI Text Enhancer & Formatter",
        caption: "Intelligent text generator that enhances user input formatting, refines phrasing, and structures technical communication.",
        image: "/projects/eb-delacruz/eb-ai-enhancer.png"
      },
      {
        id: "eb-chatbot-ebby",
        title: "Applicant Chatbot ('Ebby') & AI Assistant",
        caption: "Interactive conversational AI agent handling applicant inquiries, answering system data questions, and redirecting page routes.",
        image: "/projects/eb-delacruz/eb-chatbot-ebby.png"
      },
      {
        id: "eb-service-history",
        title: "Service Lifecycle & SMS Dispatch Log",
        caption: "Applicant dashboard tracking job milestone progress steppers, real-time messaging, and automated SMS dispatch notifications.",
        image: "/projects/eb-delacruz/eb-service-history.png"
      }
    ],
    techStack: ["Python 3.11", "Flask", "AI Assistant Engine", "Live GPS Map", "AI Text Generator", "SMS Gateway", "Docker", "Firestore", "Flutter", "OpenCV Biometrics"],
    githubUrl: "https://github.com/princessazucena",
    demoUrl: "#",
    metrics: { aiEngine: "Report & Route AI", liveMap: "GPS Tracking", sms: "Live SMS Gateway", status: "Production Ready" }
  },
  {
    id: "sk-scholarship",
    title: "Sangguniang Kabataan Scholarship & Governance Portal",
    category: "Full-Stack & Cloud",
    type: "Civic Governance & Grant Platform",
    featured: true,
    summary: "Production digital civic platform built for Sangguniang Kabataan ng Bukal that automates youth scholarship applications, provides real-time administrative applicant monitoring, automatically generates certificates of eligibility, and exports official signed attendance sheets for government audit documentaries.",
    architecture: "Flask 3.x, Supabase (PostgreSQL + Auth + Storage Buckets), Tailwind CSS, Brevo Email Engine, Certificate Generation Suite, Vercel & Render Cloud Infrastructure",
    description: "An end-to-end civic digital governance portal engineered for Sangguniang Kabataan ng Bukal. The platform enables students to submit applications and track review milestones, equips administrative officers with a centralized monitoring dashboard with analytics, automatically generates verifiable certificates for qualifying scholars, and compiles official documentary attendance sheets complete with recipient signatures.",
    highlights: [
      "Automated Certificate Generation: Instantly generates official certificates of scholarship eligibility and participation for qualifying students.",
      "Administrative Monitoring Command Center: Real-time analytics tracking submitted, pending review, verified, and rejected applications across educational institutions and year levels.",
      "Documentary Attendance & Digital Signatures: Generates official event and payout attendance rosters complete with recipient signatures for auditing and record compliance.",
      "Student Self-Service Portal: Dedicated student dashboard for submission tracking, event schedules, and instant announcements.",
      "Supabase PostgreSQL & Row-Level Security: Secure document storage with auto-expiring signed URLs ensuring strict student privacy.",
      "Brevo Automated Email Notifications: Automatic transactional email alerts notifying scholars of status updates and registration windows."
    ],
    screenshots: [
      {
        id: "sk-landing",
        title: "Public Landing Portal",
        caption: "Hero section where youth students discover scholarship announcements and initiate online registration.",
        image: "/projects/sk/sk-landing.png"
      },
      {
        id: "sk-student-dashboard",
        title: "Student Portal & Notifications",
        caption: "Student command center for tracking application approval status, upcoming events, and official notifications.",
        image: "/projects/sk/sk-student-dashboard.png"
      },
      {
        id: "sk-admin-dashboard",
        title: "Admin Monitoring & Analytics Suite",
        caption: "Central administrative dashboard displaying daily submissions, status distributions, student rosters, and certificate generation.",
        image: "/projects/sk/sk-admin-dashboard.png"
      },
      {
        id: "sk-login",
        title: "Secure Authentication Gateway",
        caption: "Role-based authentication entry point safeguarding student privacy and administrator operations.",
        image: "/projects/sk/sk-login.png"
      }
    ],
    techStack: ["Python", "Flask", "Supabase", "PostgreSQL", "Tailwind CSS", "Certificate Generator", "Brevo API", "Vercel"],
    githubUrl: "https://github.com/princessazucena/Sangguniang_Kabatan_Site",
    demoUrl: "https://sangguniangkabatansite.vercel.app/",
    metrics: { liveLink: "sangguniangkabatansite.vercel.app", certEngine: "Auto-Generated", monitoring: "Real-Time Admin", status: "Live & Deployed" }
  },
  {
    id: "bsit-sysadmin",
    title: "BSIT System Administration & Infrastructure Portfolio",
    category: "DevOps & Systems",
    type: "Infrastructure & Security Hub",
    featured: true,
    summary: "Complete laboratory infrastructure archive, network configuration policies, server security hardening, and disaster recovery automation for ITEP 414.",
    architecture: "Linux (Ubuntu Server), Windows Server, Bash Scripting, IAM Policies, Network Firewall Rules, Automated Cron Backups",
    description: "A comprehensive systems portfolio detailing weekly technical laboratories, server virtualization, directory services, access control matrices, and disaster recovery plans developed under ITEP 414 – System Administration and Maintenance.",
    highlights: [
      "Enterprise server installation, configuration, and kernel/service optimization.",
      "Identity and Access Management (IAM) role matrices, LDAP/Active Directory hierarchies, and privilege restriction.",
      "Automated disaster recovery scripts and differential backup scheduling with cron jobs.",
      "Network routing, firewall hardening, and security vulnerability auditing."
    ],
    techStack: ["Linux Server", "Windows Server", "Bash", "PowerShell", "Networking", "IAM Security", "ITEP 414"],
    githubUrl: "https://github.com/princessazucena/BSIT-SystemAdministration-Portfolio",
    demoUrl: "https://github.com/princessazucena/BSIT-SystemAdministration-Portfolio",
    metrics: { labs: "Full Semester Matrix", security: "Hardened", grade: "Exemplary" }
  },
  {
    id: "live-scoreboard",
    title: "Live Event Real-Time Tabulation & Scoring Engine",
    category: "Interactive Web",
    type: "Real-Time Scoring Platform",
    featured: false,
    summary: "Dynamic real-time scoreboard and criteria weighting engine engineered for multi-judge live tabulations and instant result rendering.",
    architecture: "Modern JavaScript (ES6+), HTML5, CSS3 Custom Properties, Responsive Dynamic DOM Tabulation",
    description: "A fast, responsive event scoring matrix enabling live multi-criteria tabulation, judge score aggregation, and responsive big-screen projector scoreboards with zero latency.",
    highlights: [
      "Dynamic criteria weighting calculator preventing computation errors during high-stakes evaluations.",
      "Live updating judge interfaces with instant validation and error prevention boundaries.",
      "Responsive visual scoreboard designed for big-screen presentation monitors and mobile judges."
    ],
    techStack: ["JavaScript", "HTML5", "CSS3 Grid/Flex", "Real-Time DOM", "UI/UX Design"],
    githubUrl: "https://github.com/princessazucena",
    demoUrl: "#",
    metrics: { latency: "< 5ms", ui: "High-Contrast HUD", status: "Operational" }
  },
  {
    id: "byte-master",
    title: "Byte Master Interactive UI & Design System",
    category: "Interactive Web",
    type: "Component Architecture Suite",
    featured: false,
    summary: "Modern interactive front-end portfolio suite demonstrating component hierarchies, dark minimalist themes, and micro-interactions.",
    architecture: "React, Tailwind CSS, Modern Web APIs, Responsive Micro-Interactions",
    description: "A refined front-end showcase highlighting modular design systems, accessible UI components, tactile interactions, and polished aesthetic presentation.",
    highlights: [
      "Modular design tokens and atomic component architecture.",
      "Fluid animations and accessible dark mode color scales.",
      "Production-ready responsive layout optimizations."
    ],
    techStack: ["React", "Tailwind CSS", "JavaScript", "Responsive Design"],
    githubUrl: "https://github.com/princessazucena/BYTE-MASTER-PORTFOLIO",
    demoUrl: "https://github.com/princessazucena/BYTE-MASTER-PORTFOLIO",
    metrics: { responsiveness: "100%", theme: "Minimalist Dark", status: "Active" }
  }
];

export const SKILLS_DATA = [
  {
    category: "Backend & Systems",
    icon: "server",
    skills: [
      { name: "Python 3.11+", level: 92 },
      { name: "Flask & Jinja2", level: 90 },
      { name: "RESTful API Architecture", level: 88 },
      { name: "Node.js Basics", level: 80 },
      { name: "RBAC & Authentication", level: 90 },
      { name: "System Admin (ITEP 414)", level: 94 },
    ]
  },
  {
    category: "Frontend & UI/UX",
    icon: "code",
    skills: [
      { name: "React 18 & Vite", level: 88 },
      { name: "JavaScript (ES6+) / DOM", level: 90 },
      { name: "Tailwind CSS & Styling", level: 95 },
      { name: "HTML5 Semantic Web", level: 96 },
      { name: "CSS3 Responsive Design", level: 90 },
      { name: "Mobile First Design", level: 92 },
    ]
  },
  {
    category: "Cloud & DevOps",
    icon: "cloud",
    skills: [
      { name: "Docker & Docker Compose", level: 85 },
      { name: "AWS (EC2 / Elastic Beanstalk)", level: 82 },
      { name: "Vercel & Render Deployment", level: 92 },
      { name: "Git & GitHub Version Control", level: 90 },
      { name: "Linux / Ubuntu Server", level: 88 },
      { name: "PowerShell & Automation", level: 85 },
    ]
  },
  {
    category: "Databases & Security",
    icon: "database",
    skills: [
      { name: "PostgreSQL & Supabase", level: 88 },
      { name: "Firebase & Firestore NoSQL", level: 86 },
      { name: "SQL Schema & Migrations", level: 90 },
      { name: "Brevo Email API / SMS Gateways", level: 88 },
      { name: "Signed URLs & Storage Buckets", level: 90 },
      { name: "Facial Match / Biometrics", level: 82 },
    ]
  }
];

export const CREDENTIALS_DATA = [
  {
    id: "degree",
    title: "Bachelor of Science in Information Technology (BSIT)",
    institution: "Higher Education Institution",
    location: "Laguna, Philippines",
    period: "2022 – Present",
    type: "Academic Degree",
    description: "Curriculum encompassing full-stack systems development, database management, network security, operating systems, and software engineering methodologies.",
    badge: "BSIT Major",
    verified: true
  },
  {
    id: "sysadmin-cert",
    title: "ITEP 414: System Administration & Maintenance Distinction",
    institution: "Department of Information Technology",
    location: "Laguna, Philippines",
    period: "Completed",
    type: "Specialized Course",
    description: "Excellence in configuring enterprise servers, disaster recovery protocols, IAM access rules, automated system auditing, and secure system maintenance portfolios.",
    badge: "Infrastructure & Security",
    verified: true
  },
  {
    id: "capstone",
    title: "Capstone Project Lead: Multi-Role Enterprise Platform",
    institution: "Academic & Industry Capstone Defense",
    location: "Laguna, Philippines",
    period: "2025 – 2026",
    type: "Capstone Engineering",
    description: "Designed and engineered the full end-to-end architecture for E.B. Dela Cruz Operations & Dispatch System using Python Flask, Docker, Firestore, Flutter, and Biometrics.",
    badge: "Capstone Defense",
    verified: true
  },
  {
    id: "civic-grant",
    title: "Civic Engineering: SK Scholarship & Grant Engine",
    institution: "Youth Governance Technology Initiative",
    location: "Laguna, Philippines",
    period: "2026",
    type: "Community Impact",
    description: "Architected public scholarship upload system with Supabase PostgreSQL RLS security, Brevo Email transactional dispatch, and administrative verification dashboards.",
    badge: "Civic Portal",
    verified: true
  }
];

export const CERTIFICATIONS_DATA = [
  {
    id: "aws-cloud-essentials",
    title: "AWS Cloud Practitioner Essentials",
    issuer: "AWS Training & Certification",
    completedDate: "May 03, 2026",
    recipient: "Princess Anne B. Azucena",
    signatory: "Michelle Vaz, Director, AWS Training & Certification",
    image: "/certificates/aws-cloud-essentials.png",
    skills: ["Cloud Architecture", "AWS Core Services", "Security & Compliance", "Billing & Pricing"],
    category: "Cloud Computing"
  },
  {
    id: "aws-genai-quest",
    title: "AWS Cloud Quest: Generative AI Practitioner",
    issuer: "AWS Training & Certification",
    completedDate: "March 29, 2026",
    recipient: "Princess Anne B. Azucena",
    signatory: "Michelle Vaz, Director, AWS Training & Certification",
    image: "/certificates/aws-genai-quest.png",
    skills: ["Generative AI", "Foundation Models", "Amazon Bedrock", "Prompt Engineering"],
    category: "Artificial Intelligence"
  },
  {
    id: "aws-ml-ai",
    title: "Fundamentals of Machine Learning and Artificial Intelligence",
    issuer: "AWS Training & Certification",
    completedDate: "May 03, 2026",
    recipient: "Princess Anne B. Azucena",
    signatory: "Michelle Vaz, Director, AWS Training & Certification",
    image: "/certificates/aws-ml-ai.png",
    skills: ["Machine Learning", "AI Pipelines", "Deep Learning", "Model Evaluation"],
    category: "Machine Learning"
  },
  {
    id: "aws-cloud-quest",
    title: "AWS Cloud Quest: Cloud Practitioner",
    issuer: "AWS Training & Certification",
    completedDate: "March 19, 2026",
    recipient: "Princess Anne B. Azucena",
    signatory: "Michelle Vaz, Director, AWS Training & Certification",
    image: "/certificates/aws-cloud-quest.png",
    skills: ["Hands-On Cloud Labs", "VPC & Networking", "EC2 & Storage", "IAM Policies"],
    category: "Cloud Infrastructure"
  }
];

export const TERMINAL_COMMANDS = {
  help: `Available Commands:
  - about      : Summary of Princess Anne B. Azucena
  - projects   : List engineered production systems
  - skills     : Display technical capabilities
  - education  : Display BSIT degree and certifications
  - contact    : Display email, LinkedIn, and GitHub links
  - socials    : Direct links to professional handles
  - clear      : Reset terminal output`,
  
  about: `PRINCESS ANNE B. AZUCENA
Title: Full-Stack Engineer & IT Specialist
Location: Majayjay, Laguna, Philippines
Bio: Software engineer and IT specialist specializing in modern backend architectures,
     cloud deployments, security policies, and clean web systems.`,

  projects: `SYSTEMS ARCHIVE:
  [1] E.B. Dela Cruz Operations System (AI Assistant + Live GPS Map + Ebby Chatbot + AI Enhancer + SMS)
  [2] Sangguniang Kabataan Scholarship Portal (Flask + Supabase + Auto Certificates + Admin Monitoring)
  [3] BSIT System Administration Portfolio (ITEP 414 Infrastructure)
  [4] Live Event Real-Time Tabulation & Scoring Engine
  [5] Byte Master Interactive UI Suite`,

  skills: `CORE TECH STACK:
  • Languages   : Python 3.11, JavaScript (ES6+), SQL, HTML5, CSS3, Dart/Flutter
  • Frameworks  : Flask, React 18, Vite, Tailwind CSS, Jinja2, Flutter
  • AI & Maps   : AI Assistant Engine, Report Generation, Route Redirection, GPS Live Map
  • Databases   : Supabase (PostgreSQL), Firebase Firestore, SQL Migrations
  • Cloud & Ops : Docker, AWS EC2 / Elastic Beanstalk, Render, Vercel, Linux/Ubuntu
  • Security    : RBAC, Signed Expiring URLs, IAM, Biometric Face Verification
  • Messaging   : Brevo Email API, Automated SMS Gateway`,

  education: `CREDENTIALS & AWS CERTIFICATIONS:
  • Degree : Bachelor of Science in Information Technology (BSIT)
  • Specialized : ITEP 414 System Administration & Maintenance Distinction
  • AWS Certifications (4x Verified):
    [1] AWS Cloud Practitioner Essentials (Completed May 03, 2026)
    [2] AWS Cloud Quest: Generative AI Practitioner (Completed March 29, 2026)
    [3] Fundamentals of Machine Learning and AI (Completed May 03, 2026)
    [4] AWS Cloud Quest: Cloud Practitioner (Completed March 19, 2026)`,

  contact: `CONTACT CHANNELS:
  • Email     : ceaneazucena@gmail.com
  • LinkedIn  : https://www.linkedin.com/in/azucena-princess-anne-b-30316a368
  • GitHub    : https://github.com/princessazucena
  • Facebook  : https://www.facebook.com/princessanne.balalaazucena/
  • Instagram : https://www.instagram.com/shobeprncxx_/`,

  socials: `SOCIAL & PROFESSIONAL PROFILES:
  • GitHub    : https://github.com/princessazucena
  • LinkedIn  : https://www.linkedin.com/in/azucena-princess-anne-b-30316a368
  • Facebook  : https://www.facebook.com/princessanne.balalaazucena/
  • Instagram : https://www.instagram.com/shobeprncxx_/`
};
