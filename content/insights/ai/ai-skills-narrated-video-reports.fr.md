---
title: "Trois compétences IA qui ont transformé notre rapport mensuel en film de trois minutes"
description: "Nous avons remplacé notre rapport en slides par une vidéo narrée et animée, construite à partir de preuves. Voici les trois compétences IA qui l'ont rendu possible, et la leçon que nous avons apprise à nos dépens."
excerpt: "Personne ne lit un rapport de quarante slides jusqu'au bout. Ce mois-ci, nous avons transformé le nôtre en film de trois minutes, narré avec notre propre voix (clonée, avec consentement) et construit uniquement à partir de preuves vérifiables."
publishedAt: "2026-10-29"
updatedAt: "2026-10-29"
author:
  name: "Robust Code"
  role: "Ingénierie & Digitalisation"
category: "ai"
tags: ["IA", "automatisation", "reporting", "clonage de voix", "gouvernance IA"]
coverImage: "/assets/images/insights/ai-skills-narrated-video-reports.jpg"
featured: true
draft: false
seo:
  title: "Trois compétences IA derrière nos rapports vidéo narrés"
  description: "Des preuves avant les opinions, une voix clonée avec consentement et la vidéo écrite en code : comment notre rapport mensuel est devenu un film de trois minutes que l'on regarde vraiment."
relatedArticles: ["ai-automation-sme-adoption-framework"]
relatedTools: ["roi-calculator"]
cta:
  title: "Vous voulez que vos rapports soient regardés, pas survolés ?"
  description: "Nous installons ce même pipeline pour les entreprises : connecté à vos données, narré avec votre voix (avec votre consentement), animé à vos couleurs."
  href: "/what-we-do/video-reports.html"
---

<video controls preload="metadata" playsinline poster="/assets/images/insights/ai-skills-narrated-video-reports.jpg" style="width:100%;border-radius:12px;margin:0 0 1.5rem;background:#000">
  <source src="/assets/videos/ai-skills-narrated-video-reports.mp4" type="video/mp4">
</video>

*La narration de cette vidéo (en anglais) est une voix générée par IA, clonée à partir de la voix de notre fondateur avec un consentement enregistré.*

## En bref

Les rapports d'avancement ont un problème de lecture, pas d'écriture. On décroche vite d'un long deck, et tout le travail investi dedans est perdu.

Ce mois-ci, nous avons essayé autre chose : notre rapport mensuel est devenu un **film narré de trois minutes**, généré à partir des mêmes faits que ceux que nous aurions mis dans des slides. Il a fallu trois compétences IA :

1. **Des preuves avant les opinions** : les agents IA construisent à partir d'une spécification écrite, et chaque phase doit se prouver par des tests et des services en ligne. Le rapport rassemble ces preuves au lieu de les décrire.
2. **Une voix vraiment à nous** : un clone de la voix de notre fondateur, créé avec un consentement enregistré, qui tourne en local et qui est toujours signalé comme généré par IA.
3. **La vidéo écrite en code** : pas de timeline de montage. Un programme dessine chaque image à partir des données du rapport, donc la vidéo du mois suivant se relance, elle ne se remonte pas.

Rien de magique là-dedans, et chaque étape a ses garde-fous. C'est justement le sujet de cet article.

## Pourquoi un rapport doit changer de format

Un rapport mensuel classique est écrit pour celui qui l'écrit : complet, défensif et long. Celui qui le lit veut trois réponses (*où en est-on, peut-on s'y fier, et quelle est la suite*) et dispose en général de quelques minutes, pas d'une heure.

Une vidéo courte impose la bonne structure. Impossible de narrer quarante slides en trois minutes : on est obligé de ne dire que l'essentiel, dans le bon ordre. Et contrairement à un deck, elle se regarde sur un téléphone, entre deux réunions, par des personnes qui n'ouvriraient jamais la pièce jointe.

Le risque est évident : une vidéo soignée peut faire passer un travail faible pour un bon travail. C'est pour cela que la première compétence compte plus que les deux autres.

## Compétence 1 : La spécification avant le code, les preuves avant les opinions

Chaque projet que nous menons suit notre framework interne, le **Robust Specification Driven Development Framework (RSDDF)**. Son cycle de vie est volontairement sobre : découverte, spécification, architecture, design, implémentation, validation, déploiement, exploitation, amélioration.

Les agents IA réalisent désormais une grande partie de notre implémentation. Ce qui rend cela sûr, ce n'est pas le modèle, c'est la structure autour :

- **Une spécification écrite d'abord.** L'agent travaille à partir d'elle, phase par phase, jamais sur une consigne vague.
- **Chaque phase doit se prouver avant que la suivante ne commence.** Des tests qui passent, des services réellement en ligne, des chiffres que chacun peut vérifier. Notre seul projet CRM exécute 109 tests automatisés.
- **Le rapport lit les preuves.** Pour chaque projet, il montre l'étape du cycle de vie, les preuves et le prochain jalon, pas des adjectifs comme « en bonne voie » ou « presque fini ».

C'est ce qui rend la vidéo digne de confiance. L'animation affiche un nombre de tests parce qu'une suite de tests existe ; elle affiche « en ligne » parce qu'une URL répond. Si un projet n'a pas encore de preuve, le rapport le dit.

**À reprendre, même sans vidéo :** remplacez les adjectifs de statut par une preuve vérifiable par projet, et un prochain jalon. C'est le changement le plus rentable que vous puissiez apporter à n'importe quel rapport.

## Compétence 2 : Une voix vraiment à nous

La narration est une voix générée par IA, clonée à partir de la voix de notre fondateur. Trois règles nous ont permis de l'assumer :

- **Le consentement est enregistré, pas supposé.** Le profil vocal a été créé par la personne à qui appartient la voix, avec une déclaration de consentement enregistrée et conservée avec lui.
- **Tout tourne en local.** Nous utilisons un studio open source de clonage vocal qui fonctionne sur un ordinateur portable. Pas de studio d'enregistrement, et le modèle vocal ne quitte jamais notre machine.
- **C'est toujours signalé.** Chaque vidéo indique à l'écran et dans sa description que la narration est générée par IA. Une voix de synthèse ne doit jamais se faire passer pour un enregistrement réel.

En Belgique et dans le reste de l'UE, ce n'est pas qu'une question de politesse. Un enregistrement de voix est une donnée personnelle au sens du RGPD, et l'AI Act européen introduit des obligations de transparence pour les contenus audio et vidéo générés ou manipulés par IA. Si vous clonez une voix, même celle de votre propre dirigeant, traitez le consentement, le stockage et l'étiquetage comme faisant partie du projet, pas comme un détail de fin.

**Ce que ce n'est pas :** un moyen de faire dire à quelqu'un ce qu'il n'a pas dit. Chaque script est écrit, relu et approuvé par un humain avant la moindre seconde d'audio.

## Compétence 3 : La vidéo écrite en code

Il n'y a pas de timeline de montage dans notre processus. Chaque image est dessinée par un programme, à partir des mêmes données que le rapport :

1. **Le script devient la voix** : chaque phrase est générée comme un clip audio séparé.
2. **La voix fixe le rythme** : comme nous savons exactement quand chaque phrase commence, nous savons quand chaque animation doit démarrer.
3. **Le rythme pilote l'animation** : compteurs, suivi du cycle de vie et sous-titres se calent automatiquement sur la narration.

Résultat concret : notre dernier rapport mensuel, d'une durée de deux minutes quarante-deux, a été rendu en une minute et demie environ sur un ordinateur portable. Le mois prochain, nous mettons à jour les données et nous relançons. Le design reste cohérent parce qu'il vit dans le code, pas dans le souvenir de la façon dont le dernier montage a été fait.

Les sous-titres incrustés viennent en prime, ce qui est utile puisque la plupart des gens regardent les vidéos sur les réseaux sans le son.

## La leçon apprise à nos dépens

Pendant que nous construisions tout cela, notre propre outil de nettoyage de disque a déplacé le modèle vocal en quarantaine pour libérer de l'espace. La narration est devenue muette, et la génération s'est bloquée en tentant de retélécharger un modèle de 2,45 Go.

Rien n'a été perdu, parce que le nettoyeur ne supprime jamais rien directement : il déplace les éléments dans une quarantaine d'où l'on peut les restaurer. Nous avons restauré le modèle en quelques secondes.

La leçon vaut pour toute automatisation : **la vitesse sans garde-fous crée de nouvelles pannes.** Chaque étape automatisée de ce pipeline (les agents, la voix, le nettoyage) a une entrée validée par un humain et un moyen de revenir en arrière.

## Ce que ce n'est pas

- **Pas un substitut au jugement.** La vidéo présente des décisions, elle ne les prend pas.
- **Pas un moyen d'embellir de mauvais résultats.** Si les preuves sont minces, la vidéo montrera des preuves minces.
- **Pas une raison de cloner des voix à la légère.** Pas de consentement, pas de clone. Pas d'étiquette, pas de publication.

## Où Robust Code intervient

Nous proposons désormais ce pipeline aux entreprises, sous forme d'automatisation. Nous le connectons à vos données de projet ou d'activité, nous configurons votre voix (avec votre consentement enregistré) ou une voix conçue pour vous, et nous intégrons votre identité visuelle une fois pour toutes. Ensuite, un rapport narré est prêt chaque mois pour vos responsables, vos partenaires ou vos clients.

Si vous voulez voir si cela correspond à la façon dont votre équipe rend compte aujourd'hui, [découvrez le service](/what-we-do/video-reports.html). Et si vous hésitez encore sur l'endroit où commencer à automatiser, notre [calculateur de ROI d'automatisation](/tools/roi-calculator/) est un bon point de départ.
