import {SsiSetVarReplaceCommand} from "./SsiSetVarCommand"
import {testUtil} from "../../../../../test/TestUtil"

describe("SsiVarCommand", () => {

  test("replaces title var", async () => {
    const command = new SsiSetVarReplaceCommand("title", (match: string, ...args: any[]) => `<title>${args[0]}</title>`)
    const context = testUtil.newHtmlContext("org/eu/fr/asso/spepse/projet/Magonia.html",
      `<!--#set var="title" value="Le projet Magonia" -->`)
    const file = await command.execute(context)
    expect(file.contents).toBe(`<title>Le projet Magonia</title>`)
  })

  test("replaces url var", async () => {
    const command = new SsiSetVarReplaceCommand("url",
      (match: string, ...args: any[]) => `<meta name="url" content="${args[0]}"/>`)
    const context = testUtil.newHtmlContext("org/eu/fr/dn/gendarmerie/index.html",
      `<!--#set var="url" value="https://www.defense.gouv.fr/gendarmerie/" -->`)
    const file = await command.execute(context)
    expect(file.contents).toBe(`<meta name="url" content="https://www.defense.gouv.fr/gendarmerie/"/>`)
  })
})
