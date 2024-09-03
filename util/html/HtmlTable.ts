import { HtmlTag } from "./HtmlTag"

export class HtmlTable {

  static create(objects: object[]): string {
    const headColumns = Object.keys(objects[0]).map(key => HtmlTag.toString("th", key)).join("")
    const headRow = HtmlTag.toString("tr", headColumns)
    const tableHead = HtmlTag.toString("thead", headRow)
    const bodyRows = []
    for (const obj of objects) {
      const bodyColumns = Object.values(obj).map(key => HtmlTag.toString("td", key)).join("")
      const row = HtmlTag.toString("tr", bodyColumns)
      bodyRows.push(row)
    }
    const tableBody = HtmlTag.toString("tbody", bodyRows.join(""))
    return HtmlTag.toString("table", tableHead + tableBody)
  }
}
