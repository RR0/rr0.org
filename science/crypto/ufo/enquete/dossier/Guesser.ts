import OpenAI from "openai"

export class Guesser {

  private readonly client: OpenAI

  constructor() {
    this.client = new OpenAI()
  }

  init() {
    const fetch
    ("../../../../")
  }

  async guess(sighting: string) {
    const prompt = buildPrompt(similarCases, description)

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{role: "user", content: prompt}]
      })
    })

    const json = await response.json()
    const response = await this.client.responses.create({
      model: "gpt-4.1",
      input: sighting
    })

    console.log(response.output_text)

  }
}
