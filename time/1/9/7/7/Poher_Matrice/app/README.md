# Matrice de Poher — Vite + TypeScript

Version HTML/CSS/TypeScript vanilla du design `Matrice de Poher.dc.html`.
Aucune dépendance runtime : uniquement Vite + TypeScript en dev.

```bash
cd vite-app
npm install
npm run dev      # serveur de dev
npm run build    # typecheck + bundle dans dist/
npm run preview  # sert dist/
```

## Fichiers

| Fichier | Rôle |
| --- | --- |
| `index.html` | shell + polices Google |
| `src/style.css` | tout le design : tokens `light-dark()`, layout, composants |
| `src/matrix.ts` | types, chargement JSON, construction du modèle, classement (règle de Poher) |
| `src/main.ts` | état, rendu (template strings), événements délégués |

## Notes

- Le thème clair/sombre suit `prefers-color-scheme` via `color-scheme: light dark`
  et la fonction CSS `light-dark()` (Chrome/Edge 123+, Safari 17.5+, Firefox 120+).
  Pas de bascule manuelle, conformément à la demande.
- La langue des libellés est déduite de `navigator.language` (`fr`, `en`, `it`),
  sans sélecteur.
- Les données sont chargées à l'exécution depuis le dépôt RR0
  (`matrix.json` + `Matrix_<lang>.json`), surchargeables par URL ou fichier local
  via la modale « Sources de données ».
- Responsive sans media query : `grid-template-columns: repeat(auto-fit, minmax(…))`,
  `clamp()` pour les tailles, cibles tactiles ≥ 44 px.
