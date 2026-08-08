import { tagsMessages_fr } from "./TagsMessages_fr.mjs"

export const DEFAULT_LANGUAGE = "fr"
export const SUPPORTED_LANGUAGES = ["fr", "en"]

const loaders = {
  fr: () => Promise.resolve(tagsMessages_fr),
  en: () => import("./TagsMessages_en.mjs").then(m => m.tagsMessages_en)
}

/**
 * @param {readonly string[]} preferences - e.g. navigator.languages
 * @param {readonly string[]} supported
 * @returns {string}
 */
export function selectLocale(preferences, supported = SUPPORTED_LANGUAGES) {
  for (const tag of preferences) {
    const language = tag.toLowerCase().split("-")[0]
    if (supported.includes(language)) {
      return language
    }
  }
  return DEFAULT_LANGUAGE
}

/**
 * @param {readonly string[]} preferences - e.g. navigator.languages
 * @returns {Promise<import("./TagsMessages_fr.mjs").TagsMessages>}
 */
export function loadTagsMessages(preferences) {
  return loaders[selectLocale(preferences)]()
}
