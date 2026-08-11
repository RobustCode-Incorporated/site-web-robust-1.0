PART 1: MASTER PROMPT FOR CODE GENERATION / LLM BUILDERS
Act as a Principal Frontend Engineer and Lead UX Designer. Build a high-performance, dark-mode, responsive web application for "ROBUST CODE" (v2)—an engineering-first digital transformation firm based on the specification below.

BRANDING & MOTTO:
- Logo: Minimalist monochrome (Hexagon isometric logo mark, pure white/black).
- Motto: "Innovation at your fingertips"
- Color Palette: Canvas Charcoal (#0D0D0D), Card Background (#161616), Text (#FFFFFF), Accents (Teal/Cyan #00E5FF & Crisp Gray #888888).

NAVIGATION & STRUCTURE:
- Header: Minimalist top nav [Logo] | [Home] [What We Do] [Our Work] [About]
- Footer: [News] [Blog] [Careers] [Contact Us]
- Our Work Filter Tabs: [Robust Code Core] | [Rahlab] | [Partnerships]

PAGE ARCHITECTURE & CORE SECTIONS:
1. HERO SECTION:
   - Dynamic bold title: "Innovation at your fingertips"
   - Sub-headline: Engineering bespoke software, CRM, ERP, Cybersecurity, and global/local payment infrastructures.
   - Background: Cinematic, ambient human-focused video loop (software engineer at workstation, hands on keyboard).

2. DIGITAL ECOSYSTEM MAP (Interactive Node Graph):
   - Interactive circular nodes mapping out technical capabilities:
     * Applications: Custom Web, Mobile (iOS/Android), Custom CRM, Enterprise ERP.
     * Integrations & Payments: Stripe, PayPal, Flexpaie (DRC Local).
     * Infrastructure & Data: Data Engineering, Analytics, Cybersecurity, API Gateway.

3. "WHAT WE DO" (4 FOCUSED BUSINESS UNITS):
   - Grid of 4 sleek cards with line-art icons and dedicated sub-pages:
     1. RC•DATA (Data Engineering & Analytics)
     2. RC•XP (Seamless & Immersive Omnichannel Experiences) — In Partnership with Rahlab
     3. RC•CORE (Software Engineering, CRM/ERP, Cybersecurity & Payment APIs)
     4. RC•STUDIO (Brand Storytelling & Content Engineering) — In Partnership with Rahlab

DESIGN SYSTEM REQUIREMENTS:
- Fully responsive across desktop, tablet, and mobile.
- Use Lucide-React line icons for technical components.
- Smooth CSS animations, frosted glass cards (backdrop-filter), and clean monochrome layouts with cyan hover states.

PART 2: SPECIFICATION DRIVEN DEVELOPMENT (SDD)
SPECIFICATION: ROBUST CODE v2 WEB PLATFORM
⚬	Document Version: 2.0.0
⚬	Brand: ROBUST CODE S.a.r.l
⚬	Tagline: Innovation at your fingertips
⚬	Architecture: Next.js (App Router), Tailwind CSS, Lucide Icons, Framer Motion
1. BRAND SYSTEM & DESIGN TOKENS
1.1 Color Palette
{
  "colors": {
    "background": "#0D0D0D",
    "surface": "#161616",
    "surface-border": "#262626",
    "text-primary": "#FFFFFF",
    "text-secondary": "#A1A1AA",
    "accent-teal": "#00E5FF",
    "accent-teal-glow": "rgba(0, 229, 255, 0.15)"
  }
}

1.2 Asset Resources & External Links
Resource Type	Resource Name	Direct Link / Library
Icons	Lucide Icon Suite	Lucide React Icons
Human Video 1	Developer Workspace (Hero)	Pexels Video #3129671
Human Video 2	Tech Collaboration	Pexels Video #3196062
Human Image 1	Hardware & Code	Unsplash Tech Workspace
Human Image 2	Engineering Team	Unsplash Developer Team
2. NAVIGATION & ROUTING SPECIFICATION
2.1 Header Structure
⚬	Left: Monochrome Isometric Hexagon Logo + Text "ROBUST CODE"
⚬	Right Menu Links:
⚬	/ -> Home
⚬	/what-we-do -> What We Do
⚬	/our-work -> Our Work
⚬	/about -> About
2.2 Footer Structure
⚬	Left: Brand Copyright & Motto ("Innovation at your fingertips")
⚬	Right Navigation Links:
⚬	/news -> News
⚬	/blog -> Blog
⚬	/careers -> Careers
⚬	/contact -> Contact Us
3. "WHAT WE DO" PAGE SPECIFICATION (BUSINESS UNITS)
The page implements 4 dedicated business units formatted as interactive glassmorphic cards:
+-----------------------------------------------------------------------+
|                            WHAT WE DO                                 |
|               Digital Transformation & Engineering                    |
+-------------------+-------------------+-------------------+-----------+
|      RC•DATA      |       RC•XP       |      RC•CORE      | RC•STUDIO |
|  Data Engineering |    Omnichannel    |    Engineering    | Creative  |
|    & Analytics    |   (with Rahlab)   |  CRM/ERP/Payments | (Rahlab)  |
+-------------------+-------------------+-------------------+-----------+

3.1 Business Units Details
Unit 1: RC•DATA
⚬	Title: RC•DATA
⚬	Description: Data Engineering, Architecture, and Business Intelligence Pipelines.
⚬	Key Stack: ETL, Pipelines, Analytics, Data Warehousing.
⚬	Sub-page: /what-we-do/rc-data
Unit 2: RC•XP
⚬	Title: RC•XP
⚬	Badge: In Partnership with Rahlab
⚬	Description: Seamless and Immersive Omnichannel User Experiences.
⚬	Key Stack: Web & Mobile Platforms, User Journey Architecture, Immersive UX.
⚬	Sub-page: /what-we-do/rc-xp
Unit 3: RC•CORE
⚬	Title: RC•CORE
⚬	Description: Custom Software Engineering, CRM/ERP Solutions, Cybersecurity & Global/Local Payment APIs.
⚬	Key Stack: Custom Web Apps, Mobile Apps, Enterprise ERP, Custom CRM, Cybersecurity, Stripe, PayPal, Flexpaie (DRC).
⚬	Sub-page: /what-we-do/rc-core
Unit 4: RC•STUDIO
⚬	Title: RC•STUDIO
⚬	Badge: In Partnership with Rahlab
⚬	Description: Brand Storytelling & Creative Digital Content Engineering.
⚬	Key Stack: Technical Media Production, Digital Storytelling, Identity Systems.
⚬	Sub-page: /what-we-do/rc-studio
4. TECHNICAL SERVICES MAP (ECOSYSTEM DIAGRAM)
A circular node diagram mapping technical infrastructure:
[ FRONTEND & APPS ] ---> [ BACKEND CORE ] <--- [ PAYMENTS & APIS ]
  - Web Applications        - Custom CRM          - Stripe
  - Mobile Apps             - Enterprise ERP      - PayPal
                            - Cybersecurity       - Flexpaie (DRC)

Lucide Icon Mapping
⚬	Web App / Responsive:
⚬	Mobile App:
⚬	Custom CRM / ERP:
⚬	Cybersecurity:
⚬	Data Engineering:
⚬	Payment APIs (Stripe, PayPal, Flexpaie):
⚬	Partnership / Rahlab: