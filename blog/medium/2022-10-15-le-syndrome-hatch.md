---
title: "Le syndrome Hatch"
subtitle: "La rencontre d’ufologues vous rappelle à quel point leur travail peut partir en fumée."
date: 2022-10-15
lang: fr
url: https://rr0.medium.com/le-syndrome-hatch-17536cc5d2c8
tags: [ufology, bases-de-données, database, sauvegarde-des-données]
---

# Le syndrome Hatch

*La rencontre d’ufologues vous rappelle à quel point leur travail peut partir en fumée.*

![](https://cdn-images-1.medium.com/max/460/1*DRAxbIPq922ebTY4nUuK3w.png)

CAIPAN 2 (Toulouse) a été une réussite, autant que sa première édition parisienne de 2014, peut-être même au-delà : la quasi-totalité des présentations a été de haute qualité sans être *ex cathedra*, avec des nombreux échanges et questions, le tout dans un esprit d’ouverture (pas de point de vue tabou, des opinions de tout bords ont été exprimées, même si l’opinion personnelle n’est pas le sujet du [GEIPAN](https://rr0.org/org/eu/fr/cnes/geipan/)).

Lors de ces échanges j’ai toutefois eu l’occasion d’entendre plusieurs fois le même discours inquiétant : tel chercheur a constitué une base de données (de manière plus ou moins confidentielle) mais :

- elle n’est **pas accessible** (pas en ligne, en un seul exemplaire chez son propriétaire) ;
- **aucune sauvegarde** n’est réalisée, encore moins envoyée en un lieu différent ou à un tiers de confiance (particuliers ou organisation) ;
- **aucun export** dans un format “neutre” pouvant d’être lu par à peu près tout le monde.
- le **matériel est obsolète**, il est vieillissant et n’est plus commercialisé et de moins en plus utilisé ;
- le **logiciel est obsolète** également. Il n’est plus maintenu par l’éditeur (pas de mises à jour permettant de le maintenir au niveau des standards modernes).
- parfois, bien que l’on sache qu’elle existe, **la base est perdue,** on ne sait plus la retrouver.

Le tout étant aggravé par le fait que, de manière assez naturelle, **les possesseurs de ces bases sont souvent les plus âgés**.

[Larry Hatch](https://rr0.org/people/h/HatchLarry/) était l’un d’entre eux. Sa base *U* de 12 123 cas, mondialement réputée dans le milieu ufologique avait été développée en [C++](https://rr0.org/tech/info/soft/proj/impl/lang/cpp/) (et même de l’assembleur) sur PC-[DOS](https://rr0.org/tech/info/soft/prod/os/DOS.html), un système qui n’est pratiquement plus utilisé aujourd’hui. Lorsque [Hatch](https://rr0.org/people/h/HatchLarry/) meurt en [2008](https://rr0.org/time/2/0/0/8/index.html) se pose la question de la transmission de son travail. [Isaac Koi](https://rr0.org/people/k/KoiIsaac/) mobilise avec d’autres des efforts considérables pour que cette œuvre d’une vie ne soit pas perdue et y parvient en partie. Malheureusement, le [code source](https://rr0.org/tech/info/soft/proj/impl/CodeSource.html) est sur des disquettes reste inaccessible, et le code exécutable, même exécuté sur un émulateur DOS, refuse de s’exécuter sans licence (le produit de [Hatch](https://rr0.org/people/h/HatchLarry/) était commercial).

La seule solution restante était le *reverse engineering*. Comme pour une soucoupe écrasée, nous essayâmes de comprendre comment la base de Hatch fonctionnait à partir de l’objet brut, non fonctionnel. Plus exactement, comment ses *données* étaient encodées, et de créer un nouveau code capable de les lire. Ce fut long et difficile, mais [nous y arrivâmes](https://www.abovetopsecret.com/forum/thread585935/pg11).

Mais mieux vaut prévenir que guérir.

## Que fait l̶a̶ ̶p̶o̶l̶i̶c̶e̶ ̶ le SCEAU ?

Lorsque l’on parle de sauvegarde d’archives en France, c’est naturellement vers cette association que l’on se tourne. Ses moyens sont limités et dépendent largement du soutien (financier et manuel) de ses adhérents.

Ces dernières années, un effort louable a été entrepris par l’association pour numériser nombre de documents mais, interrogé sur la sauvegarde des bases de données numériques, un membre du groupe reconnait un retard sur le sujet : jusqu’à présent, seule les archives papiers (livres, documents & correspondance, photos, etc.) semblaient être en danger et, pour l’instant, la sauvegarde numérique se résume à conserver en état de marche quelques vieux ordinateurs et vieux [OS](https://rr0.org/tech/info/soft/prod/os) (Windows 98, etc.). Cela ne suffira malheureusement pas.

## Que faire ?

Contrairement à une idée reçue, et à l’image des archives papier, les données numériques vieillissent. On s’imagine que, tant qu’il y aura de l’électricité, on pourra rebrancher le vieil ordi de son propriétaire, lancer son vieux logiciel de gestion de base de données et… suivant que l’on a plus ou moins de chance, suivant que l’on a trop attendu pour le faire ou pas, on réalise que :

- **on ne sait pas utiliser ce vieil OS**. Il y a-t-il un mot de passe pour s’y connecter ? Comment lancer le logiciel ? Quid si une mise à jour est imposée ?
- **on ne sait pas utiliser le logiciel**. Comment ouvrir la base ? Où se trouve-t-elle sur le disque. Il y a-t-il un mot de passe supplémentaire pour y accéder ? Où est la documentation ? Il y a longtemps que le logiciel n’est plus maintenu par son éditeur, s’il existe encore. Là aussi, quid si une mise à jour est imposée ?
- **on ne sait pas utiliser la base** : comment sont encodés ses champs, que veut dire tel ou tel code ? Où est la documentation de son utilisation et de son format ?
- **la machine ne sait pas se connecter à un réseau**, encore moins Internet.
- **la machine, le support de stockage vont bientôt rendre l’âme**. Le disque dur a des ratés, les disquettes ont des erreurs de lecture…

Si les données numériques ne tombent donc pas rapidement en poussière, les moyens d’y accéder deviennent rapidement obsolètes. Plus vite, en fait, qu’un livre part en lambeaux.

Que faire, alors, pour éviter ces problèmes ? Plusieurs choses, plus ou moins faciles, mais surtout plus ou moins prioritaires.

### Niveau 1: Documentation

En tant que propriétaire, la première chose à faire est de vous assurer que demain quelqu’un (de votre choix ou non) pourra s’asseoir à votre place et utiliser (interroger, maintenir) votre base.

Certaines choses peuvent vous sembler évidentes depuis le temps que vous travaillez dessus, mais un regard neuf pourrait avoir du mal à saisir ce que vous avez mis des années à concevoir. Produisez donc:

1. une **documentation du format** des données : quels sont les champs , comment sont-ils encodés, que signifient telles valeurs, dans quels fichiers se trouvent-elles ?
2. un **manuel d’utilisation** de votre base décrivant comment y accéder, comment effectuer telle opération (recherche, ajout, statistiques, etc.). Ce n’est pas reproduire le manuel du logiciel que vous utilisez, mais décrire les spécificités de votre base dans ce logiciel.
3. un **“coffre” de secrets** accessible à vos ayant-droits où se trouvent vos éventuels mots de passe pour accéder à tout cela. Il ne s’agit pas nécessairement d’un vrai coffre, mais simplement d’un endroit sûr où ces informations peuvent être trouvées si c’est nécessaire : les post it sur le bureau ne sont jamais recommandés pour ce genre de choses (mais beaucoup le font) mais il existe d’autres solutions, numériques (legs d’un master password, d’un compte Google, etc.) ou non (notaire à l’extrême).

### Niveau 2 : Copies

Une fois votre travail rendu utilisable par un tiers, il convient d’éviter de le perdre. Cela peut arriver pour un nombre de raisons (mauvaise manip, dégât matériel, démagnétisation) et il serait dommage de perdre tant d’années de travail (pour vous et ceux que cela pourrait intéresser) si bêtement.

Faites donc une copie des fichiers de votre base. Sur un support de stockage distinct (comme un disque externe), idéalement stocké en un lieu différent de celui de votre activité principale (une autre résidence, chez un ami ou dans un cloud privé), ce qui évitera à votre copie de subir le même sort que l’original en cas d’incendie, dégât des eaux, démagnétisation, vol, etc.

### Niveau 3 : Export

Faire des copies c’est bien, mais encore faut-il le bon logiciel pour lire les données. Comme nous l’avons vu, ce logiciel peut être devenu obsolète, difficile d’accès, et sauver vos données dans un format plus “universel” (non spécifique à un logiciel de base de données mais supporté par la quasi-totalités d’entre eux) est donc recommandé. Le meilleur candidat pour cela est sans doute à ce jour le format [CSV](https://fr.wikipedia.org/wiki/Comma-separated_values) (du texte brut ou les valeurs de champs sont simplement séparées par des virgules — ou autre — avec un enregistrement par ligne). Si votre logiciel a été mis à jour après 2005, il y a de grande chances qu’il propose l’export [CSV](https://fr.wikipedia.org/wiki/Comma-separated_values).

Un tel export pose cependant une question de confidentialité. Vous pouvez bien sûr vous contenter d’exporter votre base au format [CSV](https://fr.wikipedia.org/wiki/Comma-separated_values) et de stocker cela comme vous stockeriez une copie de sauvegarde. Ce sera déjà très bien. Mais puisque le but de cet export vise l’interopérabilité (être compréhensible par d’autres systèmes) en plus de la sauvegarde, vous voudrez peut-être expurger cet export de données que vous ne voudriez pas voir dans d’autres systèmes, qu’elles soient :

- **confidentielles** : noms/coordonnées de témoins.
- **subjectives, polémiques** : jugements sur des personnes (témoins, enquêteurs, auteurs…), politique, photos ou texte sans droits de reproduction, etc.

Deux cas de figure se posent alors :

- vous avez anticipé le problème et avez placé ces données “sensibles” dans des champs dédiés et votre logiciel de gestion de base vous permettra peut-être de les exclure de l’export.
- vous n’avez pas anticipé le problème fait et la suppression ou le caviardage de ces données va d’autant nécessiter un traitement automatisé que votre base est de taille conséquente. Généralement, votre logiciel ne vous permettra pas de réaliser facilement une telle opération. Si vous n’êtes pas informaticien, vous devrez alors probablement confier cette tâche à un spécialiste (avec un accord de confidentialité) à qui vous aurez transmis la documentation de votre format de données. Ce dernier pourra implémenter un traitement transformant votre export ([CSV](https://fr.wikipedia.org/wiki/Comma-separated_values)) en une version au même format mais expurgée des données sensibles.

### Niveau 4 : Mise en ligne

Comme nous l’avons dit, la copie et l’export peuvent se faire vers un cloud privé. La mise en ligne, elle, suppose une mise à disposition **publique**, totalement ou partiellement.

La vertu première de la mise en ligne est le **partage**, qui est une étape clé de la [démarche scientifique](https://rr0.org/science/methode/) en ce qu’elle permet de partager la connaissance (découvertes, analyses, données) mais aussi de leur donner l’opportunité de la vérifier. La publication bénévole pose cependant la question du partage “injuste”, où le travail d’un auteur peut être repris par des personnes n’ayant fourni que peu ou pas de travail, tout en en retirant les bénéfices. Ce problème peut être limité par un accès restreint à une liste d’utilisateurs donnée, mais jamais complètement évitable (vous êtes obligé de faire confiance à ceux à qui vous accordez un accès).

Ma position sur cette question est que le *but* de votre travail doit toujours primer sur le reste. Tous les efforts, tous les coûts mis en jeu ne doivent pas ne justifient pas de cacher, voire perdre le résultat de votre travail. Au contraire, ils n’ont été mobilisés que pour qu’il puisse voir le jour, et ce travail n’a de sens *que* parce qu’il sera partagé.

Si l’on accepte la mise en ligne publique, d’autres avantages émergent implicitement, au travers de l’**indexation** par les différents moteurs de recherche. Votre travail devient :

- plus **visible**, pour peu que des liens le référencent. Jour à après jour, référence après référence, son impact est démultiplié et vous en êtes mécaniquement reconnu comme source première.
- **cherchable** si votre publication adopte un format adéquat (pages web, PDF, texte brut) ce qui facilite son utilisation. Il est peu probable qu’une interface de recherche spécifique à votre publication fasse un meilleur travail qu‘un moteur de recherche capable de comprendre le sens de votre requête même si vous faites des fautes.
- **utile **si les statistiques d’accès vous indique qu’il est fréquemment consulté ou cité (par exemple le site du GEIPAN représente 1/4 des accès au site du CNES !). Être utile est la raison d’être de tout travail et le garder hors de tout usage serait un gâchis pour tout le monde.
- **sauvegardé automatiquement** lorsque des robots prennent régulièrement des “clichés” de vos publications (comme le fait l’excellent [Internet Archive](https://archive.org)). Vos soucis quant à des copies de sauvegarde sont alors allégés.

Bien sûr il n’y a pas que des avantages à publier. Outre le fait d’accepter le risque du partage “injuste” (mais qui devient marginal à mesure que votre référencement en ligne s’accroît), mobiliser un serveur pour héberger vos publications a un coût. Un coût de plus en plus accessible, mais qui doit être évalué en y incluant l’*utilisation* de votre site, et pas seulement un abonnement pour sa mise en ligne : en effet c’est vous qui allez payer la bande passante (*bandwidth*) nécessaire au téléchargement de fichiers volumineux depuis le serveur que vous louez.

### Niveau 5 : Open source

Peu de propriétaires de bases de données aujourd’hui sont informaticiens et se cantonnent donc à utiliser des logiciels existants. Parmi les informaticiens, quelques autres (comme Larry Hatch, ou moi-même) ont développé leur propre logiciel, généralement dans le but de :

- **proposer des traitements spécifiques**, qu’un logiciel généraliste ne propose pas ou qu’il serait compliqué d’ajouter à un tel logiciel.
- **limiter la dépendance à un logiciel tiers** : si le logiciel est fourni avec la base, leur cycle de vie est lié et le logiciel n’est jamais obsolète ; il est alors possible de comprendre le logiciel en lisant son code source, voire le faire évoluer (pour lui ajouter une capacité d’export par exemple).
- **Permettre à d’autres de consulter, vérifier le code** dans un souci de transparence, mais aussi d’amélioration continue en leur donnant l’opportunité de repérer et signaler un problème (bug, sécurité/confidentialité) à régler (voire de le régler eux-même).

Ce niveau de sauvegarde n’est toutefois pas réservé aux développeurs : les fichiers de données brutes (*raw data*) d’un travail peuvent être partagés dans un *repository* open source.

## Conclusion

Si rien n’est fait, le temps passant, le problème ne fera qu’empirer : matériels et logiciels deviendront de plus en plus obsolètes, et les propriétaires disparaîtront avec leur travail, sans qu’il leur leur survive.

La sauvegarde des archives numériques “natives” — celles qui ne viennent pas d’une source papier —devient donc une action urgente de la part:

- des **propriétaires** de base de donnée, qui devraient s’efforcer, pour la postérité de leur travail, de le conformer au niveau le plus élevé possible qui soit en accord avec ses choix personnels.
- des **associations de sauvegarde d’archives** qui devraient prioriser la sécurisation des travaux en risque d’être irrécupérables. Comme pour des archives papier, un contrat pourrait être passé avec tout propriétaire de base numérique pour, non seulement un *legs* numérique (dans les conditions du choix du propriétaire, à son décès ou à une date donnée) mais aussi de *sauvegardes préventives *permettant de sécuriser une version avant que la suivante ne soit perdue.
