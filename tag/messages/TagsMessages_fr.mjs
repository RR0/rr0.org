/**
 * @typedef {Object} TagsMessages
 * @property {string} toggle - Label of the nav button that reveals the tag list.
 * @property {Object<string, string>} tags - Known tag slug -> localized label. Slugs missing from
 *   this dictionary fall back to an auto-humanized version of the slug (see TagsComponent).
 */

/** @type {TagsMessages} */
export const tagsMessages_fr = {
  toggle: "Sujets",
  tags: {
    ufology: "Ufologie",
    astrophysics: "Astrophysique",
    astrochemistry: "Astrochimie",
    exoplanets: "Exoplanètes",
    seti: "SETI",
    astronomy: "Astronomie",
    astrobiology: "Astrobiologie",
    physics: "Physique",
    spaceflight: "Astronautique",
    computing: "Informatique"
  }
}
