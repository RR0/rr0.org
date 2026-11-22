/**
 * @typedef {Object} TagsMessages
 * @property {string} toggle - Label of the nav button that reveals the tag list.
 * @property {string} filtered - Placeholder shown where content has been hidden by the tag filter.
 * @property {string} reveal - Tooltip of that placeholder, inviting to click to show the content.
 * @property {Object<string, string>} tags - Known tag slug -> localized label. Slugs missing from
 *   this dictionary fall back to an auto-humanized version of the slug (see TagsComponent).
 */

/** @type {TagsMessages} */
export const tagsMessages_fr = {
  toggle: "Sujets",
  filtered: "Contenu filtré",
  reveal: "Cliquer pour afficher",
  tags: {
    ufology: "Ufologie",
    astrophysics: "Astrophysique",
    astrochemistry: "Astrochimie",
    exoplanets: "Exoplanètes",
    seti: "SETI",
    astronomy: "Astronomie",
    cosmology: "Cosmologie",
    astrobiology: "Astrobiologie",
    physics: "Physique",
    parapsychology: "Parapsychologie",
    spaceflight: "Astronautique",
    computing: "Informatique",
    archaeology: "Archéologie",
    geophysics: "Géophysique",
    religion: "Religion",
    hoax: "Canulars",
    nuclear: "Nucléaire",
    politics: "Politique",
    aviation: "Aviation",
    paleontology: "Paléontologie",
    meteorology: "Météorologie"
  }
}
