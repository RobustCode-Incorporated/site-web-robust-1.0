# Document de Spécification de Développement (SDD) - Robust Code SARL (Next-Gen Platform)

**Date:** Juillet 2026  
**Projet:** Refonte Totale & Plateforme Vitrine "Robust Engineering" (Concurrence Awwwards / Born Interactive)  
**Approche:** Specification-Driven Development (SDD) avec stack hautement performante (GSAP + Three.js + Lenis + Next.js)  

---

## 1. Prérequis Système et Environnement

Avant d'initialiser le projet, assurez-vous d'avoir installé les outils suivants sur votre poste de développement (macOS, Linux ou Windows via WSL2) :
*   **Node.js :** Version `18.x` ou `20.x` LTS (Recommandé : `20.11.0+`).
*   **Gestionnaire de paquets :** `pnpm` (Fortement recommandé pour la gestion stricte des dépendances monorepo/frontend) ou `npm`.
*   **Git :** Pour le versioning.

---

## 2. Initialisation du Projet & Commandes d'Installation

Exécutez les commandes suivantes dans votre terminal pour créer la structure de base et installer toutes les bibliothèques indispensables au niveau "Awwwards / Agence Premium" :

```bash
# 1. Création du projet Next.js (TypeScript, Tailwind, App Router)
pnpm create next-app@latest robust-code-nextgen --typescript --tailwind --app --src-dir --import-alias "@/*"

# 2. Entrer dans le répertoire du projet
cd robust-code-nextgen

# 3. Installation des dépendances cœur pour l'animation, le smooth scroll et la 3D
pnpm add gsap @gsap/react lenis three @types/three @react-three/fiber @react-three/drei

# 4. Installation des utilitaires de style et icônes
pnpm add clsx tailwind-merge lucide-react
```

### 2.1. Fichier `package.json` (Dépendances de référence)
Assurez-vous que vos dépendances incluent au minimum :
```json
{
  "dependencies": {
    "@gsap/react": "^2.1.1",
    "@react-three/drei": "^9.105.0",
    "@react-three/fiber": "^8.16.8",
    "clsx": "^2.1.0",
    "gsap": "^3.12.5",
    "lenis": "^1.1.5",
    "lucide-react": "^0.378.0",
    "next": "14.2.3",
    "react": "^18",
    "react-dom": "^18",
    "tailwind-merge": "^2.3.0",
    "three": "^0.164.1",
    "@types/three": "^0.164.1"
  }
}
```

---

## 3. Architecture des Dossiers (Clean Architecture)

```text
src/
├── app/
│   ├── layout.tsx             # Layout global (Lenis Smooth Scroll provider, Curseur)
│   ├── page.tsx               # Page d'accueil (Hero 3D, Sections Interactives)
│   ├── globals.css            # Styles globaux & variables Tailwind
│   └── services/              # Page Services
├── components/
│   ├── Preloader.tsx          # Loader initial "Compilation SVG"
│   ├── Hero3D.tsx             # Logo 3D interactif (Three.js / R3F)
│   ├── CustomCursor.tsx       # Réticule de précision magnétique
│   ├── Navbar.tsx             # Navigation principale
│   └── DecryptText.tsx        # Composant de texte avec effet de décryptage
├── hooks/
│   └── useIsomorphicLayoutEffect.ts # Hook GSAP sécurisé SSR
└── utils/
    └── animations.ts          # Fonctions utilitaires GSAP (ScrollTrigger, etc.)
```

---

## 4. Design System & Tokens (Ingénierie Pure)

### 4.1. Palette de Couleurs (`globals.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-abyssal: #030305;
  --bg-structure: #1A1A24;
  --text-main: #FFFFFF;
  --text-muted: #888898;
  --accent-cyan: #00F0FF;
  --accent-orange: #FF4500;
}

body {
  background-color: var(--bg-abyssal);
  color: var(--text-main);
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
}

.font-display {
  font-family: 'Space Grotesk', sans-serif;
}
```

---

## 5. Spécifications des Animations & Interactions (GSAP + WebGL)

### 5.1. Preloader "Compilation" (GSAP Timeline)
*   **Comportement :** Écran noir absolu au chargement. Le logo hexagonal de Robust Code se dessine via l'attribut `stroke-dashoffset` en utilisant une timeline GSAP avec un easing physique (`power4.inOut`).
*   **Effet :** Un compteur numérique (JetBrains Mono) progresse de 0 à 100% avec des statuts de chargement technique (*Initializing modules... Compiling WebGL shaders... System Robust ready*).
*   **Sortie :** Effet de "Split Curtain" (l'écran s'ouvre du centre vers le haut et le bas).

### 5.2. Hero Section 3D (Three.js / React Three Fiber)
*   **Objet :** Un logo hexagonal/cube isométrique modélisé en wireframe 3D interactif au centre de l'écran.
*   **Interaction Souris :** Le cube réagit aux coordonnées du curseur (`mousemove`) via l'interpolation linéaire (`lerp`), créant une rotation fluide en 3D.
*   **Transition Scroll :** Lorsque l'utilisateur commence à scroller, le cube se désagrège en particules lumineuses (vertices) qui s'éloignent de la caméra.

### 5.3. Curseur de Précision "Magnetic Crosshair"
*   **Design :** Un réticule de précision géométrique (`+`) fixe au centre de la souris.
*   **Physique :** Mouvement géré par GSAP `quickSetter` pour éliminer toute latence (0 lag par rapport au curseur natif).
*   **Comportement Hover :** Lorsqu'il survole un élément interactif (`<a>`, `<button>`, `.card`), le curseur se verrouille magnétiquement sur le centre de l'élément (effet d'aimant via calcul vectoriel) et change de couleur (Cyan).

### 5.4. Effet "Decrypt Hover" sur les Textes
*   Au survol des libellés de services ou de titres de projets, le texte simule un décryptage informatique (généré par une boucle de caractères aléatoires `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789` qui se stabilisent progressivement de gauche à droite).

---

## 6. Guide d'Implémentation Pas-à-Pas

### Étape 1 : Configuration du Smooth Scroll (Lenis)
Dans `src/app/layout.tsx`, enveloppez l'application avec le gestionnaire de défilement fluide Lenis pour garantir une fluidité absolue sur tous les navigateurs :
```tsx
'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
```

### Étape 2 : Implémentation du Curseur Magnétique
Créer un composant `CustomCursor.tsx` utilisant GSAP pour animer la position du réticule avec une interpolation fluide (`gsap.quickTo`).

### Étape 3 : Intégration du Logo 3D (Three.js)
Créer un composant `Hero3D.tsx` utilisant `@react-three/fiber` pour afficher l'hexagone géométrique en fil de fer (wireframe) avec un matériau émissif cyan (`#00F0FF`).

---
**Fin du document de spécification technique - Prêt pour le développement de la plateforme Robust Code SARL.**
