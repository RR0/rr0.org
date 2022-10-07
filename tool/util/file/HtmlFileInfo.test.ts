import {testUtil} from "../../test/TestUtil"
import {getHtmlFileInfo} from "./HtmlFileInfo"

describe("HtmlFileInfo", () => {

  test("title", () => {
    const fileName = "time/1/9/6/8/CondonReport/intro.htm"
    const fileContents = `<!--#include virtual="/header-start.html" -->
<title>Introduction à l'édition du NCAS - Rapport Condon</title>
<meta content="https://www.ncas.org/condon/text/intro.htm" name="url">
<meta name="author" content="Paul Jaffe (président du NCAS, janvier 1999)">
<!--#include virtual="/header-end.html" -->`
    const context = testUtil.newHtmlContext(fileName, fileContents)
    const fileInfo = getHtmlFileInfo(context, fileName)
    expect(fileInfo.title).toBe("Introduction à l'édition du NCAS")
    expect(fileInfo.author).toBe("Paul Jaffe (président du NCAS, janvier 1999)")
    expect(fileInfo.titleUrl).toBe("https://www.ncas.org/condon/text/intro.htm")
  })
})
