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
        rights: "All Rights Reserved"
      },
      aria: {
        brandHome: "ROBUST CODE home",
        toggleMenu: "Toggle menu",
        resetSelection: "Reset selection",
        instagram: "Instagram",
        x: "X",
        linkedin: "LinkedIn"
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
        subtitle: "Engineering bespoke software, CRM, ERP, Cybersecurity, and global/local payment infrastructures.",
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
        title: "Built on a trusted, modern technology stack"
      },
      clients: {
        eyebrow: "Trusted By",
        title: "Businesses that trust us to build"
      }
    },
    whatWeDo: {
      eyebrow: "Business Units",
      title: "What We Do",
      subtitle: "Digital Transformation and Engineering executed by four specialist units."
    },
    ourWork: {
      eyebrow: "Our Work",
      title: "Delivery portfolio across product, platform, and partnerships",
      tabs: {
        core: "Robust Code Core",
        rahlab: "Rahlab",
        partnerships: "Partnerships"
      },
      cards: {
        erp: { title: "ERP Command Suite", desc: "Enterprise ERP orchestration for multi-entity operations and reporting." },
        crm: { title: "Custom CRM Engine", desc: "Lead lifecycle automation and sales intelligence for distributed teams." },
        cyber: { title: "Cyber Defense Program", desc: "Security architecture hardening and incident response workflows." },
        experience: { title: "Experience Narratives", desc: "Immersive omnichannel storytelling crafted with Rahlab." },
        content: { title: "Digital Content Studio", desc: "Technical media production for digital-first campaigns and products." },
        fintech: { title: "Fintech Integrations", desc: "Stripe, PayPal, and Flexpaie payment rails for local and global payments." },
        alliance: { title: "Cross-Org Platform Alliance", desc: "API-level collaboration between engineering, content, and distribution partners." }
      }
    },
    about: {
      eyebrow: "About",
      title: "Engineering-first transformation for high-stakes operations",
      subtitle: "ROBUST CODE S.a.r.l designs and scales software systems across product engineering, data, cybersecurity, and payment infrastructure.",
      mission: { title: "Mission", desc: "Build resilient digital platforms that accelerate growth while preserving security, compliance, and speed." },
      approach: { title: "Approach", desc: "Specification-driven engineering with measurable delivery, transparent governance, and modular architecture." },
      presence: { title: "Presence", desc: "Operations and delivery across local and international markets, including DRC payment ecosystems." },
      motto: { title: "Motto", desc: "Innovation at your fingertips." }
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
        payments: { title: "Payments", desc: "Stripe, PayPal, and Flexpaie integrations for secure local and global transactions." }
      },
      rcStudio: {
        storytelling: { title: "Digital Storytelling", desc: "Narrative systems translating technical value into audience-ready language." },
        identity: { title: "Identity Engineering", desc: "Visual and content identity aligned to strategic product and market positioning." }
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
        rights: "Tous droits réservés"
      },
      aria: {
        brandHome: "Accueil ROBUST CODE",
        toggleMenu: "Afficher/masquer le menu",
        resetSelection: "Réinitialiser la sélection",
        instagram: "Instagram",
        x: "X",
        linkedin: "LinkedIn"
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
        subtitle: "Conception de logiciels sur mesure, CRM, ERP, cybersécurité et infrastructures de paiement locales et internationales.",
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
        title: "Bâti sur une pile technologique moderne et fiable"
      },
      clients: {
        eyebrow: "Ils nous font confiance",
        title: "Des entreprises qui nous font confiance pour bâtir"
      }
    },
    whatWeDo: {
      eyebrow: "Unités d'affaires",
      title: "Ce Que Nous Faisons",
      subtitle: "Transformation numérique et ingénierie assurées par quatre unités spécialisées."
    },
    ourWork: {
      eyebrow: "Nos Réalisations",
      title: "Un portefeuille de réalisations entre produit, plateforme et partenariats",
      tabs: {
        core: "Robust Code Core",
        rahlab: "Rahlab",
        partnerships: "Partenariats"
      },
      cards: {
        erp: { title: "Suite de pilotage ERP", desc: "Orchestration ERP d'entreprise pour les opérations et le reporting multi-entités." },
        crm: { title: "Moteur CRM sur mesure", desc: "Automatisation du cycle de vie des prospects et intelligence commerciale pour équipes distribuées." },
        cyber: { title: "Programme de cyberdéfense", desc: "Durcissement de l'architecture de sécurité et workflows de réponse aux incidents." },
        experience: { title: "Récits d'expérience", desc: "Storytelling omnicanal immersif conçu avec Rahlab." },
        content: { title: "Studio de contenu numérique", desc: "Production média technique pour des campagnes et produits digital-first." },
        fintech: { title: "Intégrations fintech", desc: "Rails de paiement Stripe, PayPal et Flexpaie pour les paiements locaux et internationaux." },
        alliance: { title: "Alliance de plateformes inter-organisations", desc: "Collaboration au niveau API entre partenaires d'ingénierie, de contenu et de distribution." }
      }
    },
    about: {
      eyebrow: "À Propos",
      title: "Une transformation guidée par l'ingénierie pour des opérations à forts enjeux",
      subtitle: "ROBUST CODE S.a.r.l conçoit et fait évoluer des systèmes logiciels en ingénierie produit, données, cybersécurité et infrastructure de paiement.",
      mission: { title: "Mission", desc: "Construire des plateformes numériques résilientes qui accélèrent la croissance tout en préservant sécurité, conformité et rapidité." },
      approach: { title: "Approche", desc: "Une ingénierie pilotée par les spécifications, avec une livraison mesurable, une gouvernance transparente et une architecture modulaire." },
      presence: { title: "Présence", desc: "Opérations et livraison sur les marchés locaux et internationaux, y compris les écosystèmes de paiement en RDC." },
      motto: { title: "Devise", desc: "L'innovation à portée de main." }
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
        payments: { title: "Paiements", desc: "Intégrations Stripe, PayPal et Flexpaie pour des transactions locales et internationales sécurisées." }
      },
      rcStudio: {
        storytelling: { title: "Storytelling numérique", desc: "Des dispositifs narratifs qui traduisent la valeur technique en un langage adapté au public." },
        identity: { title: "Ingénierie d'identité", desc: "Une identité visuelle et éditoriale alignée sur le positionnement stratégique produit et marché." }
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
