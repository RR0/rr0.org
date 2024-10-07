import { HtmlTag } from "./HtmlTag.js"

export class HtmlTable {

  static create(objects: object[], headers: string[] = Object.keys(objects[0])): string {
    const headColumns = headers.map(key => HtmlTag.toString("th", key)).join("")
    const headRow = HtmlTag.toString("tr", headColumns)
    const tableHead = HtmlTag.toString("thead", headRow)
    const bodyRows = []
    for (const obj of objects) {
      let bodyColumns = ""
      for (const header of headers) {
        bodyColumns += HtmlTag.toString("td", obj[header])
      }
      const row = HtmlTag.toString("tr", bodyColumns)
      bodyRows.push(row)
    }
    const tableBody = HtmlTag.toString("tbody", bodyRows.join(""))
    return HtmlTag.toString("table", tableHead + tableBody)
  }
}
