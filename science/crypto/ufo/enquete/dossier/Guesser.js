import OpenAI from "openai"
import { RR0Case, RR0Catalog } from "@rr0/case"
import { clearLine, cursorTo } from "node:readline"
import { stdout as output } from "node:process"

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

  rl

  constructor() {
    this.aiClient = new OpenAI()
    this.catalog = new RR0Catalog()
  }

  async init() {
    this.cases = []
    const casesCatalog = await this.catalog.getCases()
    const casesFiles = casesCatalog.files
    console.debug("Found ", casesFiles.length, "cases")
    for await (const caseFile of casesFiles.map(f => casesCatalog.fetch(f))) {
      this.cases.push(caseFile)
      clearLine(output, 0)
      cursorTo(output, 0, () => {
        output.write(`Loaded case ${caseFile.title}(${(this.cases.length / casesFiles.length * 100).toFixed(1)}%)`)

      })
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
