# Mises à jour des articles UFO@home sur Medium (2026-11-21)

Comparaison des cinq articles en ligne (re-synchronisés le 2026-11-21 depuis le flux RSS) avec UfoAtHome 0.198.1, qui est aussi la
version en ligne sur ufoathome.org. Chaque point indique le passage actuel, ce qui a changé dans le logiciel (avec le commit), et un
texte proposé, en anglais, à coller sur Medium. Les nouvelles captures portent le suffixe `-2026-11-21` : chacune remplace sur Medium
celle du même nom sans suffixe.

## Ce que la re-synchronisation a montré

Les propositions du 2026-11-14 sont en ligne : fondements de six (*established* à *fitted*), `source` d'une valeur, meilleur cas des
lectures (article 2) ; sept éléments, `<rr0-case>` dans l'exemple, modules, Flightradar24, versions (article 3) ; lecteur de dossier,
`source` d'une valeur, scellement (article 4) ; clé jamais mémorisée, lien vers la page anglaise (article 5).

Restent à faire :

1. **Article 3, une phrase perdue au collage.** En ligne : « Each version has its published schemaThe player follows each release by
   default… ». La fin de la phrase sur les versions du format et le début de la suivante ont disparu. Proposé, pour ce paragraphe :

   > The file format has a **version** of its own, distinct from the tool's: it only changes the day a field changes its meaning or its
   > shape. Each version has its published schema, and the player reads one version only: a file of another, older or newer, is refused
   > with a message saying so, rather than played as something it does not say. A file shared in an older version keeps being played by
   > the player pinned beside it, which is the other reason to pin it.
   >
   > The player follows each release by default, so a page embedding a reconstruction gets every fix. An author who wants to keep exactly
   > the rendering they checked can **pin the version**: the script then comes from the package as published on npm, served by
   > [jsDelivr](https://www.jsdelivr.com/), which keeps every version.

2. **Article 3, fin du paragraphe des modules** : « ([How to write one](https://ufoathome.org/docs/modules/)*).* » — la parenthèse et
   le point finaux sont en italique en ligne. À remettre en romain.

3. **Les trois points « Ne pas mettre en cause le GEIPAN » du 2026-11-14 ne sont pas appliqués** : article 1, « And some, like this
   one, fit in part… » et la légende « whose “pivot effect” would keep it pinned… » ; article 2, la capture d'ouverture
   `img2/candidates.png` (qui classe la lecture du GEIPAN sous celle du témoin) et sa légende. Les textes proposés alors restent
   valables tels quels. La capture de remplacement `img2/candidates-chiles-whitted.png` (2026-11-14) est toujours conforme à
   l'interface : refaite aujourd'hui, elle est identique.

## Urgent : les liens « ?file=/demo-data/… » ne s'ouvrent plus (6129312a, 067ba287)

Depuis 0.184, une adresse de lecteur nomme l'enregistrement par son adresse entière ; un chemin seul est refusé (« Give the whole
address, starting with https:// »). ufoathome.org étant en 0.198.1, trois liens des articles affichent aujourd'hui ce message au lieu
de la reconstitution. Vérifié en ligne : les adresses proposées ci-dessous s'ouvrent.

- Article 1, légende de la première capture, lien « Silly-le-Long (France) » :
  `https://ufoathome.org/play/?file=%2Fdemo-data%2Fcase-silly-le-long.json` →
  `https://ufoathome.org/play/?file=https://ufoathome.org/demo-data/case-silly-le-long.json`
- Article 1, légende de la photo de Cussac, lien « Cussac » :
  `https://ufoathome.org/play/?file=%2Fdemo-data%2Fcase-cussac.json` →
  `https://ufoathome.org/play/?file=https://ufoathome.org/demo-data/case-cussac.json`
- Article 4, lien « Saint-Lô » du 5ᵉ paragraphe :
  `https://ufoathome.org/play/?file=%2Fdemo-data%2Fcase-saint-lo.json` →
  `https://ufoathome.org/play/?file=https://ufoathome.org/demo-data/case-saint-lo.json`

## Article 1, Replaying the sky of a UFO sighting

### Changer de lecture : la chronologie du dossier, plus un menu (2987998e, 8e12e42e, cd3f8667)

Légende de la capture du GEIPAN, fin : « Switching readings is one menu in the player. » Un dossier se lit maintenant avec sa
chronologie à côté du lecteur, quand la largeur le permet : chaque lecture y est une carte, et l'ouvrir fait tourner le lecteur déjà
ouvert sur elle. Le menu ne reste que pour une observation lue seule. Proposé :

> Switching readings is one click in the case's history, beside the player.

### Captures

Aucune à remplacer. `silly-account.png`, `silly-geipan.png` et `cussac-photo.png` ne montrent que le rendu, sans interface ;
`chips.png` montre des pastilles identiques à celles d'aujourd'hui (seule la largeur du lecteur diffère, la chronologie du dossier
prenant maintenant une colonne à côté) ; `applet-2005.png` est la maquette de 2005.

## Article 2, What a UFO reconstruction states, and on what

### La chronologie du dossier à côté de l'événement ouvert (2987998e, 88b47576, cdfa49fb, 4b0af1e7)

À ajouter après le paragraphe « Events refer to each other… » :

> Given the width, the case's history stands in a column of its own beside the event being read or edited: each event is a card that
> opens it, and the readings can be grouped under the observation they read.

### Les lectures d'un dossier comparées côte à côte (1d48b2ab, e41aa163)

À ajouter à la fin du paragraphe « A reading is never shown at its worst… » :

> And the readings of a case can be laid side by side, in one table, ordered by what each reproduces of the account and how robustly,
> or by any of its columns.

### Captures

- `img2/case-editor.png` → `img2/case-editor-2026-11-21.png`. L'en-tête du dossier a maintenant Report, Read, Share et Save, avec
  « Also save the observations » dans le menu sous Save (ca5e213d) au lieu d'une case à cocher ; les onglets Events et File ont leur
  pictogramme (d540bb56) ; les cartes de lecture disent « Reading of » et leur sensibilité. La légende reste juste.
- `img2/phenomenon-2d.png` → `img2/phenomenon-2d-2026-11-21.png`. Le sélecteur Shapes/Bodies a disparu du groupe : quand la largeur le
  permet, les parties d'un groupe sont dans l'index à côté du rendu (2a0a4c67), et sinon des onglets soulignés à pictogramme (5e5b9b47) ;
  les sections ont leur chevron de pliage (b1d9575b). Légende inchangée.
- `img2/phenomenon.png` → `img2/phenomenon-2026-11-21.png`. Même changement, et « Interpretation title » est devenu « Reading title ».
  La description de l'image (« switched to 3D bodies ») reste juste : le champ « Account » dit « 3D · bodies ».
- `img2/basis.png`, `img2/decor.png`, `img2/candidates-chiles-whitted.png` : refaites, identiques. À garder.
- `img2/timeline.png` : non remplacée (voir « Captures écartées »).
- `img2/compare.png` : non remplacée (voir « Captures écartées »).

## Article 3, Built to outlast its sources

### Huit éléments : l'application elle-même (379c0ede, 6326fc7f, f0f6e276)

`<rr0-ufoathome>` est l'application en un élément (`rr0-ufoathome.mjs`, exporté en `./app`) : un fichier lu, et modifié sur place,
l'éditeur n'étant téléchargé que la première fois qu'on modifie quelque chose. Passage actuel : « There are seven of them, four to show
and three to edit: » et sa liste. Proposé :

> There are eight of them: four to show, three to edit, and the application that holds them:
>
> - the **scene** (the phenomenon in the real sky, weather and ground),
> - the **sighting** (the scene plus who saw it, the metadata and the sharing),
> - the **case** (a case's chronology, and whichever of its events is being read: an observation in the sighting, an interview in its reader),
> - the **interview** (a transcript read as a dialogue, whose passages lead to the moments of the observation they tell of),
> - the **sighting editor**, the **case editor** and the **interview editor**,
> - the **application**, which reads a file and turns into its editor in place when something is to be changed, the editor being
>   downloaded only then.

### L'application installée (33fe7bff, 5ffd3173)

Paragraphe « Offline » : installée, l'application ne s'ouvre plus sur l'accueil du site mais sur `/app/`, un éditeur vierge sur toute
la fenêtre, avec New, Open (fichiers du disque, plusieurs à la fois, ou une adresse), les fichiers récents, et l'ouverture des `.json`
depuis le système. À ajouter après la première phrase (« …it gets its own window and icon. ») :

> Installed, it opens on the application itself rather than on the site's home page: an empty editor on the whole window, with New,
> Open (files from the disk, several at once, or a file's address) and the files opened lately; the system can open a recording with it
> too.

### Captures

- `img3/share.png` → `img3/share-2026-11-21.png`, facultatif : seule la version épinglée change (0.177.2 → 0.198.1), la boîte est la
  même.
- `img3/rr0org.png` et `img3/files.png` : refaites, identiques. À garder.

## Article 4, What the witness said, and where it shows

### Transcrire l'enregistrement de l'interview dans l'éditeur (8eec4bc2, 190dccc5)

Section « Transcripts from elsewhere » : un transcript peut maintenant naître dans UFO@home. À ajouter à la fin de la section :

> A transcript can also be made in the editor, from the recording of the interview: by Whisper, in the investigator's own browser, so
> that nothing leaves the machine, or by a service on their own key (Groq, OpenAI, or AssemblyAI, which tells the voices apart). Whose
> each voice is, a transcription does not know: every turn waits for its speaker, given with a "Who speaks…" button under it, and the
> whole for its proofreading.

### Captures

- `img4/interview-linked-turn.png` → `img4/interview-linked-turn-2026-11-21.png` ;
  `img4/interview-redacted.png` → `img4/interview-redacted-2026-11-21.png` ;
  `img4/interview-redacted-whole.png` → `img4/interview-redacted-whole-2026-11-21.png`. Chaque tour a maintenant « Who speaks… »
  (8eec4bc2) ; les tours sont plus larges, et le cadre ne coupe plus un tour en haut ou en bas.
- `img4/interview-to-moment.png` → `img4/interview-to-moment-2026-11-21.png`. Le champ « ID » de l'observation n'existe plus
  (fd502a4e) ; on voit le bandeau de la citation, les onglets de groupe à pictogramme, l'index des sections à gauche (Period, Moments) et
  le rendu. La description de l'image (« the case editor showing the observation of Q. B. at moment B, under a banner… ») reste juste.
- `img4/interview-summary.png`, `img4/moment-passages.png` : refaites, mêmes champs. À garder.
- `img4/value-from-interview.png` : non remplacée (voir « Captures écartées »).

## Article 5, AI writes the account, never the sky

Rien à changer. `img5/drafting-panel.png` et `img5/create-with-ai.png`, refaites, sont identiques ; le texte (groupe Summary,
« Drafted by », clé jamais mémorisée) correspond à l'interface.

## Captures écartées, et défauts trouvés

Prises avec le Chrome installé lancé en en-US (`-AppleLanguages "(en-US)" -AppleLocale en_US`), sur le build servi à
http://localhost:3000 (0.198.1), les enregistrements chargés depuis ufoathome.org (identiques à ceux du build). Les éditeurs sont
pris dans l'application (`/app/?mode=edit&file=…`) à 1600 px de large, où ils ont leur mise en page à deux colonnes.

- **`timeline` (article 2)** : le champ natif « Observation end », vide pour Socorro, affiche « dd/mm/yyyy, --:-- ». La capture
  publiée a le même défaut. Deux causes : la date de fin vide se montre comme un champ natif à remplir, et l'ordre jour/mois suit la
  région de macOS (fr_FR), que ni `-AppleLocale en_US`, ni `LANG`/`LC_ALL`, ni `--lang` ne changent (essayé sur une page de test : même
  résultat, comme pour la virgule décimale « 0,06 »).
- **`compare` (article 2)** : la légende du moment (« A — Evelyn Trent sees the object to the north-east… ») déborde de l'image
  centrée sur toute la largeur du lecteur : ses deux bouts, blanc sur blanc, ne se lisent plus. Le texte du moment dit en outre
  « object » au lieu de « phenomenon » (donnée de la démo McMinnville). La capture publiée montre encore la ligne « Phenomenon: 0.0° off
  · width ×1.25 · height ×2.30 », que la nouvelle n'a pas eu le temps de montrer.
- **`value-from-interview` (article 4)** : dans l'application, la fenêtre du fondement s'ouvre au-dessus du cap et cache le nom du
  champ ; la liste « Passage » coupe la citation (« …vu que tu »), comme dans la capture publiée. Avec le cap de l'observateur (section
  Gaze), la fenêtre affiche « How » et « Why » au lieu de « Rationale » : ce n'est pas la valeur citée par l'article (celle-ci est le
  cap du premier événement du témoin, « Witness's events »).

Autres remarques, sans effet sur les captures retenues :

- `phenomenon-2026-11-21.png` : le corps « The craft » dit « Stands for the shapes: No shape », alors que la phrase au-dessus dit que
  chaque corps tient lieu d'une ou plusieurs formes ; le bouton du modèle 3D est grisé et finit par « … » (déjà sur la capture publiée).
- Dans l'application, le groupe Summary d'une observation montre un champ « ID » (par ex. `1948-07-24-ChilesClarence`), que la page
  /edit/ ne montre pas.
- L'interviewer s'affiche par son identifiant (`BeauJerome`), comme le 2026-11-14.
- La page /edit/ de ufoathome.org illustre « A case, and its observations » par une ancienne capture du dossier (case « Also save the
  observations » dans l'en-tête).
- Le champ « What happens » d'un moment coupe une description longue (`moment-passages.png`, publiée et refaite).

## Scripts

Les cinq scripts de capture nomment l'enregistrement par son adresse entière (`DATA`, par défaut `https://ufoathome.org`), ouvrent les
éditeurs dans `/app/` à 1600 px, déplient les sections pliées, choisissent une section par l'index (`pick`, `open(…, section)`), et ne
cadrent plus le rendu au-dessus d'un groupe ; les cartes du dossier sont des `.event-card`. Lancement :
`SITE=http://localhost:3000 node article-2-shots.mjs <dossier> [noms…]` (hors bac à sable : Chrome avec WebGL).
