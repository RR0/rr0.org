import OpenAI from "openai"
import { RR0Case, RR0Catalog } from "@rr0/case"

export class Guesser {
  /**
   * @protected
   * @readonly
   * @type {OpenAI}
   */
  aiClient

  /**
   * @protected
   * @readonly
   * @type {RR0Catalog}
   */
  catalog

  /**
   * @protected
   * @type {RR0Case[]}
   */
  cases = []

  constructor() {
    this.aiClient = new OpenAI()
    this.catalog = new RR0Catalog()
  }

  async init() {
    this.cases = []
    const cases = await this.catalog.getCases()
    for (const caseFile of cases.files) {
      this.cases.push(await cases.fetch(caseFile))
    }
  }

  /**
   * @protected
   * @param {RR0Case[]} examples
   * @param {string} newObs
   * @return {string}
   */
  buildPrompt(examples, newObs) {
    return `Tu es un expert en OVNIs. Voici des cas expliqués :\n\n` +
      examples.map(e => `- "${e.description}" → "${e.conclusion}"`).join("\n") +
      `\n\nQue peut-on proposer comme explication pour : "${newObs}" ?`
  }

  /**
   * @param {string} sightingDescription
   * @return {Promise<string>}
   */
  async guess(sightingDescription) {
    const prompt = this.buildPrompt(this.cases, sightingDescription)
    const chatResponse = await this.aiClient.chat.completions.create({
      model: "gpt-4.1",
      messages: [{ role: "user", content: prompt }]
    })
    return chatResponse.choices[0].message.content
  }
}
