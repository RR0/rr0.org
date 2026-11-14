# Mises à jour des articles UFO@home sur Medium (2026-11-14)

Comparaison des cinq articles en ligne (re-synchronisés le 2026-11-14) avec UfoAtHome 0.177.2 (publié et déployé). Chaque point indique le passage
actuel, ce qui a changé dans le logiciel (avec le commit), et un texte proposé, en anglais, à coller sur Medium.

## Article 2, What a UFO reconstruction states, and on what

### Les fondements sont six, plus quatre (7d3639d7)

Les deux ajouts viennent de la relecture d'A. Cousyn (GEIPAN) : *established* et *fitted*. Les bornes de la liste changent.

Passage actuel : « **Any value of a recording can carry its basis**, among four: » puis la liste measured, stated, derived, assumed.

Proposé :

> This may be the most important part of the model. **Any value of a recording can carry its basis**, among six, from the strongest:
>
> - **established**: settled away from the account and from the reconstruction: a document, a register, a survey, a third party's measurement;
> - **measured**: read off an instrument, by the witness or an investigator (a clock, a compass, an arm's-length gauge, a theodolite on site);
> - **stated**: the witness said it (the default, so that a plain value means what it always meant);
> - **derived**: worked out from what the witness said plus something checkable (a road's width, a map, a measured drawing), with the working written down;
> - **assumed**: chosen so that the reconstruction has a value at all, on nothing the witness said;
> - **fitted**: moved, within what is known, to see whether a hypothesis can be made to fit.
>
> The two ends were asked for by the GEIPAN's reviewer of the tool. What is established is the one thing a reconstruction can fairly be
> judged against, since it owes nothing to either. What is fitted is a knob: the more of them a reading turns, the easier a likeness is
> to obtain, and the less that likeness proves. Nothing is ever tested against a fitted value.

Dans la conclusion : « every value can carry its **basis** (measured, stated, derived, assumed) » → « every value can carry its
**basis** (from established to fitted) ».

### Une valeur nomme ce sur quoi elle repose (40554b61)

Un fondement dit de quelle *nature* est une valeur ; `source` dit *laquelle* : un passage d'interview, un document et sa page, une
photo de l'enregistrement, l'outil de mesure. À ajouter après le paragraphe sur la fenêtre du fondement (avant « The list of assumed
values… ») :

> A basis says what kind of thing a value rests on; a **source** says which thing, the one somebody would go and look at: the passage of
> an interview where the witness said it, a document and its page, the picture of the recording it was measured on, or the tool it was
> measured with. A guess names none, which is exactly what "assumed" already says.

### Les lectures : meilleur cas, constats, sensibilité (ebda56f7, cdf199fc, 31c2c077, 6e1886ff)

L'article dit que les corps sont testés « the hard way ». Le logiciel va plus loin : une lecture est jouée dans sa configuration la
plus favorable, cherchée dans ce que le récit permet, elle garde ses constats (tient, échoue, non testé), et la marge de ses valeurs
libres est mesurée. Proposé, après le paragraphe de la comparaison de McMinnville :

> A reading is never shown at its worst. Its **most favourable configuration** is searched for within what the account allows (the
> Sun's heights over the days it allows, the side the light comes from) and it is measured there. What it was tested against is kept
> with it as **findings**, each one holding, failing or untested, so that a reading that fails stays in the case and shows why. And
> since every value it was free to choose is a way to make it fit, the margin it has on each is measured too: a likeness bought with
> many free values proves little.

## Article 3, Built to outlast its sources

### Un lecteur de dossier : sept éléments, pas six (9f2676de, 37d4de8f)

`<rr0-case>` lit un dossier comme `<rr0-case-editor>` l'écrit : sa chronologie, ses événements, et celui qu'on lit (une observation dans
le lecteur, une interview dans le lecteur de dialogue). Il est dans le même fichier que le lecteur d'observation (`rr0-sighting.mjs`).
La page /play/ le monte quand on lui donne un case.json.

Passage actuel : « There are six of them, three to show and three to edit: » et sa liste.

Proposé :

> There are seven of them, four to show and three to edit:
>
> - the **scene** (the phenomenon in the real sky, weather and ground),
> - the **sighting** (the scene plus who saw it, the metadata and the sharing),
> - the **case** (a case's chronology, and whichever of its events is being read: an observation in the sighting, an interview in its reader),
> - the **interview** (a transcript read as a dialogue, whose passages lead to the moments of the observation they tell of),
> - the **sighting editor**, the **case editor** and the **interview editor**.

### L'exemple des deux lignes : un dossier se lit avec `<rr0-case>`

`<rr0-sighting>` lit encore un case.json, mais c'est l'ancienne façon ; le lecteur de dossier montre en plus son historique et ses deux
témoins. Vérifié sur ufoathome.org en production depuis une autre page : il affiche « La rencontre de Cussac », l'historique avec les
observations de François et Anne-Marie Delpeuch, et la scène.

Proposé :

> ```html
> <script type="module" src="https://ufoathome.org/lib/rr0-sighting.mjs"></script>
> <rr0-case src="https://ufoathome.org/demo-data/case-cussac.json"></rr0-case>
> ```
>
> Paste them into any HTML page and the case of Cussac appears: its two witnesses, and the plateau with the sphere leaving it. For your
> own case, `src` is the address of its file; for a single observation, `<rr0-sighting>` plays its recording alone.

Note : le titre du dossier de Cussac est en français seulement (« La rencontre de Cussac »), y compris sur une page anglaise.

### Les modules, chargés par adresse (bf984e6b, 99d6c1a5, 50a48ad1)

L'article dit qu'une deuxième source s'ajoute « without touching the rest » : c'était vrai du code, c'est maintenant ouvert à tous. Un
module est un manifeste `ufoathome-module.json` à une adresse : des tuiles d'imagerie ou de relief, des modèles 3D, et un script
facultatif qui peut contribuer à n'importe quel point d'extension (15 : sources, types d'événements du ciel, types de lectures,
perception du témoin…). Un enregistrement nomme les modules dont il a besoin ; un lecteur en reçoit les données, jamais le script
d'un module qu'il n'a pas ajouté lui-même. Proposé, à la fin de la section des providers :

> And a source no longer has to be part of UFO@home to be offered. A **module** is a small file at an address, its manifest: tiles of
> imagery or relief, 3D models, and, if need be, a script that adds a source, a kind of sky event or a kind of reading at any of the
> tool's extension points. Anybody can add one from the editor, and a recording names those it was made with, so that it is drawn the
> same wherever it is opened; a reader gets what a manifest states, never a script they did not add themselves. ([How to write
> one](https://ufoathome.org/docs/modules/).)

Dans la liste des sources : « the air traffic from adsb.lol » → « the air traffic from [adsb.lol](https://adsb.lol/), or from
Flightradar24 with the reader's own key ».

### Versions : une ancienne version n'est plus convertie (ef336cfe)

Passage actuel : « Each version has its published schema, a file of an older version is converted as it is read, and a file of a
version newer than the player is refused with a message, rather than played as something it does not say. »

Le lecteur ne lit plus qu'une version du format, et refuse les autres, anciennes comprises. Un fichier partagé dans une version
ancienne se lit avec le lecteur épinglé à côté de lui ; un script hors du logiciel (`scripts/migrate-recordings.ts`) met à jour un
fichier ancien. Proposé :

> Each version has its published schema, and the player reads one version only: a file of another, older or newer, is refused with a
> message saying so, rather than played as something it does not say. A file shared in an older version keeps being played by the
> player pinned beside it, which is the other reason to pin it.

Dans la conclusion : « **versions**: of the format, read forward and refused when too new » → « **versions**: of the format, each with
its schema, and of the player, which can be pinned to the format it was shared with ».

## Article 4, What the witness said, and where it shows

### L'interview comme source d'une valeur, maintenant explicite (40554b61, 78e988e9)

La section « The interview as a source of the observation » décrit la justification (*rationale*) qui cite l'appel. Le format a
désormais un lien direct : la `source` d'une valeur peut être le passage de l'interview (l'événement, le tour de parole). Ajout proposé
à la fin du premier paragraphe de cette section :

> A value can also point at the passage itself: its **source** names the interview and the turn of speech, so that a reader goes from
> the heading to the very words in one click, the way a turn of the transcript goes to its moment.

### L'interview lisible depuis le lecteur (cf881309, 9f2676de)

« The same pair exists outside the editor. A page can show an interview with the <rr0-interview> element next to a reconstruction… »
reste vrai. On peut ajouter que le lecteur de dossier montre les interviews avec les observations :

> The same pair exists outside the editor. The case reader lists a case's interviews beside its observations: a passage followed to
> its moment opens the observation there, and while a replay runs, the dialogue open beside it shows the passage that tells of where
> it stands. A page can also show an interview alone, with the `<rr0-interview>` element.

### Retour du témoin sur une reconstitution : figer l'événement (52e68265, deae132f)

Nouveau, et lié aux interviews : quand on interroge le témoin sur une reconstitution, une modification ultérieure de celle-ci rendrait
sa réponse caduque. L'auteur peut donc **figer** (*seal*) l'événement et le **cloner** pour continuer sur une copie. Paragraphe
proposé, avant « Who approved it » :

> An interview is also how a witness answers a reconstruction: shown it, they say what is right and what is not. A later edit would
> then quietly make their answer about something that no longer exists. So the author can **seal** the reconstruction the witness was
> shown, and carry on with a clone of it: the sealed one takes no edit, says so on its card, and stays what the interview answered.

## Article 5, AI writes the account, never the sky

### La clé n'est plus jamais mémorisée (4ae537e4)

Passage actuel : « The key is kept in the browser only if they tick "Remember on this device", and forgotten as soon as they untick it. »

La case a disparu : un module chargé par adresse s'exécuterait sur le même site et pourrait lire le stockage du navigateur. La clé est
gardée dans la mémoire de la page jusqu'à son rechargement. Proposé :

> The key is never stored: it is held in the page's memory, and gone when the page is reloaded. A module loaded from an address runs in
> the same page, and a key kept in the browser's storage would be within its reach.

Légende de la première capture : « The key is the author's own, and stays in their browser » → « The key is the author's own, and is
never stored ».

La capture `img5/drafting-panel.png` montrait encore la case « Remember on this device » : refaite le 2026-11-14 (sans la case, et le
champ « Workspace ID » n'y coupe plus son texte indicatif, corrigé dans UfoAtHome). À remplacer sur Medium.

### Un lien vers une page française

« written as a prompt » renvoie à `https://ufoathome.org/docs/create/index_fr.html#2-with-an-ai-assistant-from-the-case-file`, la page
française, dans un article anglais. Proposé : `https://ufoathome.org/docs/create/#2-with-an-ai-assistant-from-the-case-file`.

## Captures

Les captures datent du 2026-11-07. Depuis, l'éditeur de dossier (une seule ligne de temps, les lectures sous leur observation, les
cartes en phrases) et la barre du lecteur ont changé. À refaire au moins : `img2/case-editor.png` (éditeur de dossier de Socorro) et
`img4/*` si la mise en page de l'interview a changé. Article 1 et article 3 (`share.png`, refaite le 2026-11-11) : à jour.
