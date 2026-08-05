# People authoring rules

These rules apply to biographies and their metadata under `people/`, in addition to the repository-level
[`AGENTS.md`](../AGENTS.md).

## Prefer structured metadata

Put structured biographical information in `people.json` first and never duplicate it in `index.html`: the people build
step inserts it automatically. This applies to:

- the person's name: when it is available from `people.json`, start the page with
  `<!--#include virtual="/header.html" -->` instead of declaring a `<title>` between `header-start.html` and
  `header-end.html`;
- birth date and place (`birth` event);
- death date and place (`death` event);
- the portrait when an image event's `url` is named `portrait.xxx`.

Attach sources to the corresponding event in `people.json` whenever the schema supports them. Keep `index.html` for the
sourced narrative and facts that are not generated from the metadata.
