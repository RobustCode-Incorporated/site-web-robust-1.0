const STORAGE_KEY = "rc-lang";
const SUPPORTED_LANGS = ["en", "fr"];
const DEFAULT_LANG = "en";

const translations = {
  en: {
    common: {
      nav: {
        home: "Home",
        whatWeDo: "What We Do",
        ourWork: "Our Work",
        about: "About"
      },
      footer: {
        tagline: "Innovation at your fingertips",
        news: "News",
        blog: "Blog",
        careers: "Careers",
        contact: "Contact Us",
        companyHeading: "Company",
        contactHeading: "Contact",
        trustHeading: "Trust & Security",
        security: "Security",
        privacyProtection: "Privacy Protection",
        gdpr: "GDPR",
        support: "Support",
        legalHeading: "Legal",
        legalNotice: "Legal Notice",
        privacyPolicy: "Privacy Policy",
        cookiePolicy: "Cookie Policy",
        termsUse: "Terms of Use",
        termsConditions: "Terms & Conditions",
        rights: "All Rights Reserved"
      },
      aria: {
        brandHome: "ROBUST CODE home",
        toggleMenu: "Toggle menu",
        resetSelection: "Reset selection",
        instagram: "Instagram",
        x: "X",
        linkedin: "LinkedIn",
        changeLanguage: "Change language"
      }
    },
    units: {
      rcData: {
        title: "RC•DATA",
        desc: "Data Engineering, Architecture, and Business Intelligence Pipelines."
      },
      rcXp: {
        title: "RC•XP",
        desc: "Seamless and Immersive Omnichannel Experiences.",
        badge: "In Partnership with Rahlab"
      },
      rcCore: {
        title: "RC•CORE",
        desc: "Software Engineering, CRM/ERP, Cybersecurity, and Global/Local Payment APIs."
      },
      rcStudio: {
        title: "RC•STUDIO",
        desc: "Brand Storytelling and Creative Digital Content Engineering.",
        badge: "In Partnership with Rahlab"
      }
    },
    home: {
      hero: {
        eyebrow: "ROBUST CODE S.a.r.l",
        title: "Innovation at your fingertips",
        ctaPrimary: "Explore What We Do",
        ctaSecondary: "View Our Work"
      },
      ecosystem: {
        eyebrow: "Digital Ecosystem Map",
        title: "Engineering capabilities mapped as one connected system",
        core: "ROBUST CORE",
        legend: {
          applications: "Applications",
          payments: "Integrations & Payments",
          infrastructure: "Infrastructure & Data"
        }
      },
      cards: {
        customWeb: { label: "Custom Web", desc: "Responsive web platforms engineered for speed and reliability." },
        mobile: { label: "Mobile iOS/Android", desc: "Native and cross-platform apps for iOS and Android." },
        crm: { label: "Custom CRM", desc: "Tailored CRM systems for sales and customer lifecycle management." },
        erp: { label: "Enterprise ERP", desc: "End-to-end ERP for multi-entity operations and reporting." },
        payments: { label: "Stripe / PayPal / Flexpaie", desc: "Global and DRC-local payment rails unified into one checkout layer." },
        apiGateway: { label: "API Gateway", desc: "Unified routing, authentication, and rate-limiting across every service." },
        cyber: { label: "Cybersecurity", desc: "Hardening, monitoring, and incident response for critical systems." },
        dataEng: { label: "Data Engineering", desc: "Pipelines and warehousing that keep data reliable at scale." },
        analytics: { label: "Analytics", desc: "Business intelligence dashboards built on governed data." }
      },
      detail: {
        category: "Digital Ecosystem",
        title: "Robust Core",
        desc: "Hover or select any capability to see how it connects to the Robust Core."
      },
      whatWeDo: {
        eyebrow: "What We Do",
        title: "Four focused business units for end-to-end transformation"
      },
      partners: {
        eyebrow: "Technology Partners",
        title: "We choose technology based on the business requirement — not the other way around."
      },
      clients: {
        eyebrow: "Trusted By",
        titlePart1: "Awesome ",
        titleHighlight1: "clients",
        titlePart2: " and ",
        titleHighlight2: "brands",
        titlePart3: " we've worked with"
      }
    },
    whatWeDo: {
      eyebrow: "Business Units",
      title: "What We Do",
      subtitle: "Digital Transformation and Engineering executed by four specialist units.",
      exploreCta: "Explore the Unit"
    },
    ourWork: {
      eyebrow: "Delivery Portfolio",
      title: "Our Work",
      subtitle: "Delivery portfolio across product, platform, and partnerships.",
      exploreCta: "Explore Case Study",
      tabs: {
        all: "All Work",
        core: "Robust Code Core",
        rahlab: "Rahlab",
        partnerships: "Partnerships"
      },
      cards: {
        erp: { title: "ERP Command Suite", meta: "Robust Code Core • Platform", desc: "Enterprise ERP orchestration for multi-entity operations and reporting." },
        crm: { title: "Custom CRM Engine", meta: "Partnership with Rahlab • Product", desc: "Lead lifecycle automation and sales intelligence for distributed teams." },
        experience: { title: "Experience Narratives", meta: "Partnership with Rahlab • Experience", desc: "Immersive omnichannel storytelling crafted with Rahlab." },
        content: { title: "Digital Content Studio", meta: "Partnership with Rahlab • Content", desc: "Technical media production for digital-first campaigns and products." },
        fintech: { title: "Fintech Integrations", meta: "Partnerships • Payments", desc: "Stripe, PayPal, and Flexpaie payment rails for local and global payments." },
        alliance: { title: "Cross-Org Platform Alliance", meta: "Partnerships • Platform", desc: "API-level collaboration between engineering, content, and distribution partners." }
      }
    },
    about: {
      eyebrow: "About",
      title: "Engineering-first transformation for high-stakes operations",
      subtitle: "ROBUST CODE S.a.r.l designs and scales software systems across product engineering, data, cybersecurity, and payment infrastructure.",
      mission: { title: "Mission", desc: "Build resilient digital platforms that accelerate growth while preserving security, compliance, and speed." },
      approach: { title: "Approach", desc: "Specification-driven engineering with measurable delivery, transparent governance, and modular architecture." },
      presence: { title: "Presence", desc: "Operations and delivery across local and international markets, including DRC payment ecosystems." },
      motto: { title: "Motto", desc: "Innovation at your fingertips." },
      vision: {
        eyebrow: "The Founder's Dream",
        name: "Jean-Luc Luzemba",
        headline: "Digitalising Africa",
        text: "Validated in Europe for global scale. Engineered to transform the African continent with world-class native architecture.",
        card1: "Global Validation",
        card2: "African Infrastructure"
      }
    },
    news: {
      eyebrow: "News",
      title: "Latest updates from ROBUST CODE",
      subtitle: "Platform releases, strategic partnerships, and delivery milestones will be published here."
    },
    blog: {
      eyebrow: "Blog",
      title: "Engineering notes and transformation insights",
      subtitle: "Articles on architecture, data, cybersecurity, and scalable product delivery will appear here."
    },
    careers: {
      eyebrow: "Careers",
      title: "Build with engineers who care about resilience",
      subtitle: "We are hiring across software, data, product, and cybersecurity disciplines.",
      contact: "Contact: careers@robust-code.com"
    },
    contact: {
      eyebrow: "Contact Us",
      title: "Let us engineer your next transformation chapter",
      email: "Email: contact@robust-code.com",
      whatsapp: "WhatsApp: +32 467 613 480",
      linkedin: "LinkedIn: /company/robustcodesarl"
    },
    subpages: {
      unit1: "Unit 1",
      unit2: "Unit 2",
      unit3: "Unit 3",
      unit4: "Unit 4",
      rcData: {
        etl: { title: "ETL Pipelines", desc: "Reliable extraction and transformation across operational and analytical systems." },
        warehouse: { title: "Data Warehousing", desc: "Optimized warehouse design for high-volume reporting and decision intelligence." }
      },
      rcXp: {
        journeys: { title: "Omnichannel Journeys", desc: "Connected web and mobile experiences with coherent identity and interaction flow." },
        immersive: { title: "Immersive UX", desc: "High-fidelity experience systems built for conversion, retention, and delight." }
      },
      rcCore: {
        platforms: { title: "Custom Platforms", desc: "Web and mobile systems engineered for scale, speed, and operational reliability." },
        payments: { title: "Payments", desc: "Stripe, PayPal, and Flexpaie integrations for secure local and global transactions." },
        rem: {
          eyebrow: "Flagship Product",
          title: "REM",
          fullName: "Robust Enterprise Management",
          desc: "Our commercialized enterprise platform — unified operations, finance, and reporting for growing organizations."
        },
        rcm: {
          eyebrow: "Internal R&D",
          title: "RCM",
          fullName: "Robust Customer Management",
          desc: "Our internal engine for customer intelligence and relationship data, built to power everything we ship next."
        }
      },
      rcStudio: {
        storytelling: { title: "Digital Storytelling", desc: "Narrative systems translating technical value into audience-ready language." },
        identity: { title: "Identity Engineering", desc: "Visual and content identity aligned to strategic product and market positioning." }
      }
    },
    legal: {
      security: {
        eyebrow: "Trust & Security",
        title: "Security",
        updated: "Last updated: August 2026",
        intro: "We build and operate every system with security as a first-class engineering requirement, not an afterthought.",
        s1: { heading: "Infrastructure & Hosting", body: "Production systems run on hardened cloud infrastructure with network segmentation, encrypted storage, and continuous monitoring across every environment we operate." },
        s2: { heading: "Application Security", body: "Every release passes through code review, dependency scanning, and access-control checks before it reaches production, keeping vulnerabilities out of the delivery pipeline." },
        s3: { heading: "Incident Response", body: "We maintain a documented incident response process so that any anomaly is triaged, contained, and communicated to affected clients without delay." },
        s4: { heading: "Responsible Disclosure", body: "If you believe you've found a security issue in one of our systems, contact us at security@robust-code.com and we will investigate promptly." }
      },
      privacyProtection: {
        eyebrow: "Trust & Security",
        title: "Privacy Protection",
        updated: "Last updated: August 2026",
        intro: "Protecting personal data is a design constraint we build against, not a policy we bolt on afterward.",
        s1: { heading: "Data Minimization", body: "We collect only the data required to deliver a service or fulfil a contractual obligation, and avoid retaining information beyond its useful purpose." },
        s2: { heading: "Access Controls", body: "Personal data is restricted to the team members who need it to do their work, governed by role-based access and logged for accountability." },
        s3: { heading: "Data Retention", body: "Retention periods are defined per data category and enforced through automated lifecycle rules rather than manual review." },
        s4: { heading: "Your Rights", body: "You may request access to, correction of, or deletion of your personal data at any time by writing to privacy@robust-code.com." }
      },
      gdpr: {
        eyebrow: "Trust & Security",
        title: "GDPR",
        updated: "Last updated: August 2026",
        intro: "ROBUST CODE S.A.R.L operates from Brussels, Belgium, and applies the principles of the EU General Data Protection Regulation across our engagements, regardless of where a client is based.",
        s1: { heading: "Legal Basis for Processing", body: "We process personal data under one of four bases: contractual necessity, legitimate interest, legal obligation, or explicit consent, and document which applies to each processing activity." },
        s2: { heading: "Data Subject Rights", body: "Under the GDPR you have the right to access, rectify, erase, restrict, or port your data, and to object to certain processing activities." },
        s3: { heading: "International Transfers", body: "Where data is transferred outside the European Economic Area, we rely on standard contractual clauses or equivalent safeguards recognized by the European Commission." },
        s4: { heading: "Data Protection Contact", body: "Questions about our GDPR practices can be directed to privacy@robust-code.com." }
      },
      support: {
        eyebrow: "Trust & Security",
        title: "Support",
        updated: "Last updated: August 2026",
        intro: "Every engagement includes a direct line to the engineers who built your system, not a ticket queue.",
        s1: { heading: "Contact Channels", body: "Reach our support team by email at support@robust-code.com, or through the escalation contact provided in your service agreement." },
        s2: { heading: "Response Times", body: "Standard requests are acknowledged within one business day; production-impacting issues are triaged immediately under our incident response process." },
        s3: { heading: "Escalation", body: "If a request needs to move faster than the standard channel allows, your account contact can escalate it directly to the engineering lead on your project." },
        s4: { heading: "Status & Incidents", body: "For active incidents affecting a live system, we communicate directly with affected clients as the situation develops rather than relying on a public status page alone." }
      },
      notice: {
        eyebrow: "Legal",
        title: "Legal Notice",
        updated: "Last updated: August 2026",
        intro: "This notice identifies the entity responsible for this website and the services described on it, in accordance with applicable transparency requirements.",
        s1: { heading: "Publisher", body: "This website is published by ROBUST CODE S.A.R.L." },
        s2: { heading: "Registered Offices", body: "Belgium office: BeCentral, Cantersteen 12, 1000 Bruxelles, Belgium (representation office only). Registered office: Kinshasa, Democratic Republic of the Congo." },
        s3: { heading: "Company Identification", body: "RCCM: CD/KNG/RCCM/24-B-03978 — ID Nat.: 01-J6100-N69522B." },
        s4: { heading: "Intellectual Property", body: "All content on this website, including text, graphics, and code, is the property of ROBUST CODE S.A.R.L unless otherwise credited, and may not be reproduced without written permission." },
        metaLabel1: "Company",
        metaLabel2: "Belgium office",
        metaLabel3: "Registered office",
        metaLabel4: "RCCM",
        metaLabel5: "ID Nat."
      },
      privacyPolicy: {
        eyebrow: "Legal",
        title: "Privacy Policy",
        updated: "Last updated: August 2026",
        intro: "This policy explains what personal data ROBUST CODE S.A.R.L collects, why we collect it, and how you can control it.",
        s1: { heading: "Information We Collect", body: "We collect information you provide directly, such as your name and email when you contact us, along with limited technical data like browser type and pages visited." },
        s2: { heading: "How We Use Information", body: "Information is used to respond to inquiries, deliver contracted services, and improve the reliability of our website and products." },
        s3: { heading: "Sharing & Disclosure", body: "We do not sell personal data. We share it only with service providers who support our operations, under contractual confidentiality obligations, or when required by law." },
        s4: { heading: "Data Retention", body: "We retain personal data only as long as necessary for the purpose it was collected for, or as required by applicable law." },
        s5: { heading: "Your Rights", body: "Depending on your jurisdiction, you may have the right to access, correct, delete, or export your data. Contact privacy@robust-code.com to exercise these rights." }
      },
      cookiePolicy: {
        eyebrow: "Legal",
        title: "Cookie Policy",
        updated: "Last updated: August 2026",
        intro: "This site uses a limited set of cookies to remember your preferences and understand how the site is used.",
        s1: { heading: "What Are Cookies", body: "Cookies are small text files stored on your device that let a website recognize your browser across visits." },
        s2: { heading: "How We Use Cookies", body: "We use strictly necessary cookies to keep the site functional (such as remembering your language choice) and, where enabled, analytics cookies to understand aggregate usage patterns." },
        s3: { heading: "Managing Preferences", body: "You can control or delete cookies through your browser settings at any time; disabling non-essential cookies will not affect core site functionality." },
        s4: { heading: "Third-Party Cookies", body: "Some embedded content, such as social media links, may set their own cookies governed by that third party's own policy." }
      },
      termsUse: {
        eyebrow: "Legal",
        title: "Terms of Use",
        updated: "Last updated: August 2026",
        intro: "These terms govern your use of this website. By browsing this site, you agree to the terms below.",
        s1: { heading: "Acceptance of Terms", body: "Accessing this website constitutes acceptance of these Terms of Use. If you do not agree, please discontinue use of the site." },
        s2: { heading: "Permitted Use", body: "You may access and browse this website for lawful, informational purposes only. Automated scraping or misuse of site infrastructure is prohibited." },
        s3: { heading: "Intellectual Property", body: "All trademarks, logos, and content on this site remain the property of ROBUST CODE S.A.R.L or its licensors and may not be used without prior written consent." },
        s4: { heading: "Disclaimer", body: "Content on this site is provided for general information and does not constitute a binding offer or professional advice." },
        s5: { heading: "Changes to These Terms", body: "We may update these terms from time to time; continued use of the site after changes constitutes acceptance of the revised terms." }
      },
      termsConditions: {
        eyebrow: "Legal",
        title: "Terms & Conditions",
        updated: "Last updated: August 2026",
        intro: "These general terms and conditions govern engagements between ROBUST CODE S.A.R.L and its clients, alongside any specific contract signed for a given project.",
        s1: { heading: "Scope of Services", body: "Services are defined per engagement in a statement of work or service agreement, which takes precedence over these general terms for matters it explicitly covers." },
        s2: { heading: "Engagement & Contracts", body: "A project begins once both parties have signed the relevant agreement and any required deposit has been received." },
        s3: { heading: "Fees & Payment", body: "Fees, currency, and payment schedule are set out in the applicable agreement; overdue invoices may result in a pause of active work." },
        s4: { heading: "Liability", body: "ROBUST CODE S.A.R.L's liability under any engagement is limited to the fees paid for the specific service giving rise to the claim, except where limitation is excluded by law." },
        s5: { heading: "Governing Law & Jurisdiction", body: "These terms are governed by the laws applicable at ROBUST CODE S.A.R.L's registered office, and any dispute will be submitted to the competent courts of that jurisdiction." }
      }
    }
  },
  fr: {
    common: {
      nav: {
        home: "Accueil",
        whatWeDo: "Ce Que Nous Faisons",
        ourWork: "Nos Réalisations",
        about: "À Propos"
      },
      footer: {
        tagline: "L'innovation à portée de main",
        news: "Actualités",
        blog: "Blog",
        careers: "Carrières",
        contact: "Contactez-nous",
        companyHeading: "Entreprise",
        contactHeading: "Contact",
        trustHeading: "Confiance et Sécurité",
        security: "Sécurité",
        privacyProtection: "Protection de la vie privée",
        gdpr: "RGPD",
        support: "Support",
        legalHeading: "Juridique",
        legalNotice: "Mentions légales",
        privacyPolicy: "Politique de confidentialité",
        cookiePolicy: "Politique de cookies",
        termsUse: "Conditions d'utilisation",
        termsConditions: "Conditions générales",
        rights: "Tous droits réservés"
      },
      aria: {
        brandHome: "Accueil ROBUST CODE",
        toggleMenu: "Afficher/masquer le menu",
        resetSelection: "Réinitialiser la sélection",
        instagram: "Instagram",
        x: "X",
        linkedin: "LinkedIn",
        changeLanguage: "Changer de langue"
      }
    },
    units: {
      rcData: {
        title: "RC•DATA",
        desc: "Ingénierie des données, architecture et pipelines de business intelligence."
      },
      rcXp: {
        title: "RC•XP",
        desc: "Expériences omnicanales fluides et immersives.",
        badge: "En partenariat avec Rahlab"
      },
      rcCore: {
        title: "RC•CORE",
        desc: "Ingénierie logicielle, CRM/ERP, cybersécurité et API de paiement locales et internationales."
      },
      rcStudio: {
        title: "RC•STUDIO",
        desc: "Storytelling de marque et ingénierie de contenu numérique créatif.",
        badge: "En partenariat avec Rahlab"
      }
    },
    home: {
      hero: {
        eyebrow: "ROBUST CODE S.a.r.l",
        title: "L'innovation à portée de main",
        ctaPrimary: "Découvrir nos activités",
        ctaSecondary: "Voir nos réalisations"
      },
      ecosystem: {
        eyebrow: "Cartographie de l'écosystème numérique",
        title: "Des capacités d'ingénierie cartographiées comme un système connecté",
        core: "ROBUST CORE",
        legend: {
          applications: "Applications",
          payments: "Intégrations et paiements",
          infrastructure: "Infrastructure et données"
        }
      },
      cards: {
        customWeb: { label: "Web sur mesure", desc: "Plateformes web responsives conçues pour la rapidité et la fiabilité." },
        mobile: { label: "Mobile iOS/Android", desc: "Applications natives et multiplateformes pour iOS et Android." },
        crm: { label: "CRM sur mesure", desc: "Systèmes CRM sur mesure pour la gestion des ventes et du cycle de vie client." },
        erp: { label: "ERP d'entreprise", desc: "ERP de bout en bout pour les opérations et le reporting multi-entités." },
        payments: { label: "Stripe / PayPal / Flexpaie", desc: "Rails de paiement internationaux et locaux (RDC) unifiés en une seule couche de paiement." },
        apiGateway: { label: "Passerelle API", desc: "Routage unifié, authentification et limitation de débit pour tous les services." },
        cyber: { label: "Cybersécurité", desc: "Durcissement, supervision et réponse aux incidents pour les systèmes critiques." },
        dataEng: { label: "Ingénierie des données", desc: "Pipelines et entrepôts de données garantissant la fiabilité des données à grande échelle." },
        analytics: { label: "Analytique", desc: "Tableaux de bord de business intelligence construits sur des données maîtrisées." }
      },
      detail: {
        category: "Écosystème numérique",
        title: "Robust Core",
        desc: "Survolez ou sélectionnez une capacité pour voir comment elle se connecte au Robust Core."
      },
      whatWeDo: {
        eyebrow: "Ce que nous faisons",
        title: "Quatre unités spécialisées pour une transformation de bout en bout"
      },
      partners: {
        eyebrow: "Partenaires technologiques",
        title: "Nous choisissons la technologie en fonction du besoin métier — jamais l'inverse."
      },
      clients: {
        eyebrow: "Ils nous font confiance",
        titlePart1: "Des ",
        titleHighlight1: "clients",
        titlePart2: " et des ",
        titleHighlight2: "marques",
        titlePart3: " exceptionnels avec qui nous avons collaboré"
      }
    },
    whatWeDo: {
      eyebrow: "Unités d'affaires",
      title: "Ce Que Nous Faisons",
      subtitle: "Transformation numérique et ingénierie assurées par quatre unités spécialisées.",
      exploreCta: "Découvrir l'unité"
    },
    ourWork: {
      eyebrow: "Portefeuille de réalisations",
      title: "Nos Réalisations",
      subtitle: "Un portefeuille de réalisations entre produit, plateforme et partenariats.",
      exploreCta: "Voir l'étude de cas",
      tabs: {
        all: "Tous les projets",
        core: "Robust Code Core",
        rahlab: "Rahlab",
        partnerships: "Partenariats"
      },
      cards: {
        erp: { title: "Suite de pilotage ERP", meta: "Robust Code Core • Plateforme", desc: "Orchestration ERP d'entreprise pour les opérations et le reporting multi-entités." },
        crm: { title: "Moteur CRM sur mesure", meta: "Partenariat avec Rahlab • Produit", desc: "Automatisation du cycle de vie des prospects et intelligence commerciale pour équipes distribuées." },
        experience: { title: "Récits d'expérience", meta: "Partenariat avec Rahlab • Expérience", desc: "Storytelling omnicanal immersif conçu avec Rahlab." },
        content: { title: "Studio de contenu numérique", meta: "Partenariat avec Rahlab • Contenu", desc: "Production média technique pour des campagnes et produits digital-first." },
        fintech: { title: "Intégrations fintech", meta: "Partenariats • Paiements", desc: "Rails de paiement Stripe, PayPal et Flexpaie pour les paiements locaux et internationaux." },
        alliance: { title: "Alliance de plateformes inter-organisations", meta: "Partenariats • Plateforme", desc: "Collaboration au niveau API entre partenaires d'ingénierie, de contenu et de distribution." }
      }
    },
    about: {
      eyebrow: "À Propos",
      title: "Une transformation guidée par l'ingénierie pour des opérations à forts enjeux",
      subtitle: "ROBUST CODE S.a.r.l conçoit et fait évoluer des systèmes logiciels en ingénierie produit, données, cybersécurité et infrastructure de paiement.",
      mission: { title: "Mission", desc: "Construire des plateformes numériques résilientes qui accélèrent la croissance tout en préservant sécurité, conformité et rapidité." },
      approach: { title: "Approche", desc: "Une ingénierie pilotée par les spécifications, avec une livraison mesurable, une gouvernance transparente et une architecture modulaire." },
      presence: { title: "Présence", desc: "Opérations et livraison sur les marchés locaux et internationaux, y compris les écosystèmes de paiement en RDC." },
      motto: { title: "Devise", desc: "L'innovation à portée de main." },
      vision: {
        eyebrow: "Le Rêve du Fondateur",
        name: "Jean-Luc Luzemba",
        headline: "Digitaliser l'Afrique",
        text: "Validée en Europe pour une échelle mondiale. Conçue pour transformer le continent africain avec une architecture native de classe mondiale.",
        card1: "Validation Mondiale",
        card2: "Infrastructure Africaine"
      }
    },
    news: {
      eyebrow: "Actualités",
      title: "Dernières actualités de ROBUST CODE",
      subtitle: "Les sorties de plateforme, partenariats stratégiques et jalons de livraison seront publiés ici."
    },
    blog: {
      eyebrow: "Blog",
      title: "Notes d'ingénierie et perspectives de transformation",
      subtitle: "Des articles sur l'architecture, les données, la cybersécurité et la livraison de produits évolutifs seront publiés ici."
    },
    careers: {
      eyebrow: "Carrières",
      title: "Construisez avec des ingénieurs attachés à la résilience",
      subtitle: "Nous recrutons dans les domaines du logiciel, des données, du produit et de la cybersécurité.",
      contact: "Contact : careers@robust-code.com"
    },
    contact: {
      eyebrow: "Contactez-nous",
      title: "Laissez-nous concevoir votre prochain chapitre de transformation",
      email: "E-mail : contact@robust-code.com",
      whatsapp: "WhatsApp : +32 467 613 480",
      linkedin: "LinkedIn : /company/robustcodesarl"
    },
    subpages: {
      unit1: "Unité 1",
      unit2: "Unité 2",
      unit3: "Unité 3",
      unit4: "Unité 4",
      rcData: {
        etl: { title: "Pipelines ETL", desc: "Extraction et transformation fiables à travers les systèmes opérationnels et analytiques." },
        warehouse: { title: "Entreposage de données", desc: "Conception d'entrepôts optimisée pour le reporting à grand volume et l'aide à la décision." }
      },
      rcXp: {
        journeys: { title: "Parcours omnicanaux", desc: "Expériences web et mobiles connectées avec une identité et un parcours d'interaction cohérents." },
        immersive: { title: "UX immersive", desc: "Systèmes d'expérience haute-fidélité conçus pour la conversion, la rétention et la satisfaction." }
      },
      rcCore: {
        platforms: { title: "Plateformes sur mesure", desc: "Systèmes web et mobiles conçus pour la montée en charge, la rapidité et la fiabilité opérationnelle." },
        payments: { title: "Paiements", desc: "Intégrations Stripe, PayPal et Flexpaie pour des transactions locales et internationales sécurisées." },
        rem: {
          eyebrow: "Produit phare",
          title: "REM",
          fullName: "Robust Enterprise Management",
          desc: "Notre plateforme d'entreprise commercialisée — opérations, finance et reporting unifiés pour les organisations en croissance."
        },
        rcm: {
          eyebrow: "R&D interne",
          title: "RCM",
          fullName: "Robust Customer Management",
          desc: "Notre moteur interne d'intelligence client et de données relationnelles, conçu pour alimenter tout ce que nous développerons ensuite."
        }
      },
      rcStudio: {
        storytelling: { title: "Storytelling numérique", desc: "Des dispositifs narratifs qui traduisent la valeur technique en un langage adapté au public." },
        identity: { title: "Ingénierie d'identité", desc: "Une identité visuelle et éditoriale alignée sur le positionnement stratégique produit et marché." }
      }
    },
    legal: {
      security: {
        eyebrow: "Confiance et Sécurité",
        title: "Sécurité",
        updated: "Dernière mise à jour : août 2026",
        intro: "Nous construisons et exploitons chaque système en faisant de la sécurité une exigence d'ingénierie de premier plan, et non une réflexion après coup.",
        s1: { heading: "Infrastructure et hébergement", body: "Les systèmes de production s'exécutent sur une infrastructure cloud durcie, avec segmentation réseau, stockage chiffré et supervision continue sur chaque environnement que nous exploitons." },
        s2: { heading: "Sécurité applicative", body: "Chaque mise en production passe par une revue de code, une analyse des dépendances et des contrôles d'accès avant d'atteindre la production, afin d'écarter les vulnérabilités du pipeline de livraison." },
        s3: { heading: "Réponse aux incidents", body: "Nous maintenons un processus documenté de réponse aux incidents afin que toute anomalie soit triée, contenue et communiquée sans délai aux clients concernés." },
        s4: { heading: "Divulgation responsable", body: "Si vous pensez avoir découvert une faille de sécurité sur l'un de nos systèmes, contactez-nous à security@robust-code.com et nous l'examinerons rapidement." }
      },
      privacyProtection: {
        eyebrow: "Confiance et Sécurité",
        title: "Protection de la vie privée",
        updated: "Dernière mise à jour : août 2026",
        intro: "Protéger les données personnelles est une contrainte de conception que nous intégrons dès la construction, et non une politique ajoutée après coup.",
        s1: { heading: "Minimisation des données", body: "Nous ne collectons que les données nécessaires à la fourniture d'un service ou à l'exécution d'une obligation contractuelle, et évitons de conserver des informations au-delà de leur utilité." },
        s2: { heading: "Contrôles d'accès", body: "Les données personnelles sont réservées aux membres de l'équipe qui en ont besoin pour leur travail, selon un accès basé sur les rôles et journalisé pour assurer la responsabilité." },
        s3: { heading: "Conservation des données", body: "Les durées de conservation sont définies par catégorie de données et appliquées via des règles de cycle de vie automatisées plutôt qu'une revue manuelle." },
        s4: { heading: "Vos droits", body: "Vous pouvez demander l'accès, la correction ou la suppression de vos données personnelles à tout moment en écrivant à privacy@robust-code.com." }
      },
      gdpr: {
        eyebrow: "Confiance et Sécurité",
        title: "RGPD",
        updated: "Dernière mise à jour : août 2026",
        intro: "ROBUST CODE S.A.R.L opère depuis Bruxelles, en Belgique, et applique les principes du Règlement général sur la protection des données de l'UE à l'ensemble de nos missions, quel que soit le lieu où se trouve un client.",
        s1: { heading: "Base légale du traitement", body: "Nous traitons les données personnelles sur l'une de quatre bases : nécessité contractuelle, intérêt légitime, obligation légale ou consentement explicite, et documentons celle qui s'applique à chaque activité de traitement." },
        s2: { heading: "Droits des personnes concernées", body: "En vertu du RGPD, vous disposez du droit d'accéder à vos données, de les rectifier, de les effacer, d'en restreindre le traitement, de les porter, et de vous opposer à certains traitements." },
        s3: { heading: "Transferts internationaux", body: "Lorsque des données sont transférées hors de l'Espace économique européen, nous nous appuyons sur des clauses contractuelles types ou des garanties équivalentes reconnues par la Commission européenne." },
        s4: { heading: "Contact protection des données", body: "Pour toute question sur nos pratiques RGPD, contactez privacy@robust-code.com." }
      },
      support: {
        eyebrow: "Confiance et Sécurité",
        title: "Support",
        updated: "Dernière mise à jour : août 2026",
        intro: "Chaque mission inclut une ligne directe avec les ingénieurs qui ont conçu votre système, et non une file d'attente de tickets.",
        s1: { heading: "Canaux de contact", body: "Contactez notre équipe support par e-mail à support@robust-code.com, ou via le contact d'escalade indiqué dans votre contrat de service." },
        s2: { heading: "Délais de réponse", body: "Les demandes standards sont accusées réception sous un jour ouvré ; les incidents affectant la production sont triés immédiatement selon notre processus de réponse aux incidents." },
        s3: { heading: "Escalade", body: "Si une demande doit avancer plus vite que le canal standard ne le permet, votre contact peut l'escalader directement au responsable technique de votre projet." },
        s4: { heading: "Statut et incidents", body: "Pour les incidents actifs affectant un système en production, nous communiquons directement avec les clients concernés à mesure que la situation évolue, plutôt que de nous reposer uniquement sur une page de statut publique." }
      },
      notice: {
        eyebrow: "Juridique",
        title: "Mentions légales",
        updated: "Dernière mise à jour : août 2026",
        intro: "Cette page identifie l'entité responsable de ce site et des services qu'il décrit, conformément aux exigences de transparence applicables.",
        s1: { heading: "Éditeur", body: "Ce site est édité par ROBUST CODE S.A.R.L." },
        s2: { heading: "Sièges", body: "Bureau Belgique : BeCentral, Cantersteen 12, 1000 Bruxelles, Belgique (bureau de représentation uniquement). Siège social : Kinshasa, République démocratique du Congo." },
        s3: { heading: "Identification de l'entreprise", body: "RCCM : CD/KNG/RCCM/24-B-03978 — ID Nat. : 01-J6100-N69522B." },
        s4: { heading: "Propriété intellectuelle", body: "L'ensemble du contenu de ce site, textes, visuels et code compris, est la propriété de ROBUST CODE S.A.R.L sauf mention contraire, et ne peut être reproduit sans autorisation écrite." },
        metaLabel1: "Entreprise",
        metaLabel2: "Bureau Belgique",
        metaLabel3: "Siège social",
        metaLabel4: "RCCM",
        metaLabel5: "ID Nat."
      },
      privacyPolicy: {
        eyebrow: "Juridique",
        title: "Politique de confidentialité",
        updated: "Dernière mise à jour : août 2026",
        intro: "Cette politique explique quelles données personnelles ROBUST CODE S.A.R.L collecte, pourquoi nous les collectons, et comment vous pouvez les maîtriser.",
        s1: { heading: "Informations que nous collectons", body: "Nous collectons les informations que vous nous fournissez directement, comme votre nom et votre e-mail lors d'un contact, ainsi que des données techniques limitées comme le type de navigateur et les pages visitées." },
        s2: { heading: "Utilisation des informations", body: "Les informations sont utilisées pour répondre aux demandes, fournir les services contractés et améliorer la fiabilité de notre site et de nos produits." },
        s3: { heading: "Partage et divulgation", body: "Nous ne vendons pas de données personnelles. Nous ne les partageons qu'avec des prestataires qui soutiennent nos opérations, sous obligation contractuelle de confidentialité, ou lorsque la loi l'exige." },
        s4: { heading: "Conservation des données", body: "Nous conservons les données personnelles uniquement le temps nécessaire à la finalité pour laquelle elles ont été collectées, ou selon les exigences légales applicables." },
        s5: { heading: "Vos droits", body: "Selon votre juridiction, vous pouvez disposer d'un droit d'accès, de rectification, de suppression ou d'export de vos données. Contactez privacy@robust-code.com pour exercer ces droits." }
      },
      cookiePolicy: {
        eyebrow: "Juridique",
        title: "Politique de cookies",
        updated: "Dernière mise à jour : août 2026",
        intro: "Ce site utilise un nombre limité de cookies pour mémoriser vos préférences et comprendre l'usage du site.",
        s1: { heading: "Qu'est-ce qu'un cookie", body: "Les cookies sont de petits fichiers texte stockés sur votre appareil qui permettent à un site de reconnaître votre navigateur d'une visite à l'autre." },
        s2: { heading: "Notre usage des cookies", body: "Nous utilisons des cookies strictement nécessaires au fonctionnement du site (comme la mémorisation de votre choix de langue) et, lorsqu'ils sont activés, des cookies analytiques pour comprendre les tendances d'usage agrégées." },
        s3: { heading: "Gérer vos préférences", body: "Vous pouvez contrôler ou supprimer les cookies via les paramètres de votre navigateur à tout moment ; désactiver les cookies non essentiels n'affecte pas les fonctionnalités principales du site." },
        s4: { heading: "Cookies tiers", body: "Certains contenus intégrés, comme les liens vers les réseaux sociaux, peuvent déposer leurs propres cookies, régis par la politique de ce tiers." }
      },
      termsUse: {
        eyebrow: "Juridique",
        title: "Conditions d'utilisation",
        updated: "Dernière mise à jour : août 2026",
        intro: "Ces conditions régissent votre utilisation de ce site. En le consultant, vous acceptez les conditions ci-dessous.",
        s1: { heading: "Acceptation des conditions", body: "L'accès à ce site vaut acceptation des présentes Conditions d'utilisation. Si vous n'êtes pas d'accord, veuillez cesser d'utiliser le site." },
        s2: { heading: "Usage autorisé", body: "Vous pouvez consulter ce site à des fins licites et informatives uniquement. Le scraping automatisé ou tout usage abusif de l'infrastructure du site est interdit." },
        s3: { heading: "Propriété intellectuelle", body: "L'ensemble des marques, logos et contenus de ce site restent la propriété de ROBUST CODE S.A.R.L ou de ses concédants, et ne peuvent être utilisés sans accord écrit préalable." },
        s4: { heading: "Avertissement", body: "Le contenu de ce site est fourni à titre d'information générale et ne constitue ni une offre contractuelle ni un conseil professionnel." },
        s5: { heading: "Modifications des présentes conditions", body: "Nous pouvons modifier ces conditions ponctuellement ; la poursuite de l'utilisation du site après modification vaut acceptation des conditions révisées." }
      },
      termsConditions: {
        eyebrow: "Juridique",
        title: "Conditions générales",
        updated: "Dernière mise à jour : août 2026",
        intro: "Ces conditions générales régissent les missions entre ROBUST CODE S.A.R.L et ses clients, aux côtés de tout contrat spécifique signé pour un projet donné.",
        s1: { heading: "Périmètre des services", body: "Les services sont définis par mission dans un cahier des charges ou un contrat de service, qui prévaut sur les présentes conditions générales pour les points qu'il couvre explicitement." },
        s2: { heading: "Engagement et contrats", body: "Un projet démarre une fois que les deux parties ont signé l'accord correspondant et que tout acompte requis a été reçu." },
        s3: { heading: "Honoraires et paiement", body: "Les honoraires, la devise et l'échéancier de paiement sont fixés dans l'accord applicable ; les factures impayées peuvent entraîner une suspension des travaux en cours." },
        s4: { heading: "Responsabilité", body: "La responsabilité de ROBUST CODE S.A.R.L dans le cadre d'une mission est limitée aux honoraires versés pour le service spécifique à l'origine de la réclamation, sauf lorsque la loi exclut une telle limitation." },
        s5: { heading: "Droit applicable et juridiction", body: "Ces conditions sont régies par le droit applicable au siège social de ROBUST CODE S.A.R.L, et tout litige sera soumis aux tribunaux compétents de cette juridiction." }
      }
    }
  }
};

function getNested(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function detectLang() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("lang");
  if (fromUrl && SUPPORTED_LANGS.includes(fromUrl)) return fromUrl;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored;

  const browserLang = (navigator.language || "").slice(0, 2).toLowerCase();
  if (SUPPORTED_LANGS.includes(browserLang)) return browserLang;

  return DEFAULT_LANG;
}

function applyTranslations(lang) {
  const dict = translations[lang] || translations[DEFAULT_LANG];

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = getNested(dict, el.getAttribute("data-i18n"));
    if (typeof value === "string") {
      el.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.getAttribute("data-i18n-attr").split(",").forEach((pair) => {
      const [attr, key] = pair.split(":").map((part) => part.trim());
      const value = getNested(dict, key);
      if (attr && typeof value === "string") {
        el.setAttribute(attr, value);
      }
    });
  });

  document.documentElement.setAttribute("lang", lang);

  document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
    const isActive = btn.getAttribute("data-lang-toggle") === lang;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
}

function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  window.localStorage.setItem(STORAGE_KEY, lang);

  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url);

  applyTranslations(lang);
}

function initLanguageSwitcher() {
  document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang-toggle")));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyTranslations(detectLang());
  initLanguageSwitcher();
});
