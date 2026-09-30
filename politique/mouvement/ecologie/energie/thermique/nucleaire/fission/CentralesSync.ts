import {writeFile} from "node:fs/promises"

type Row = (string | number | null)[]

/**
 * Regenerates centrales.json from the public Google Sheet (sheets Types réacteur, Communes, Centrales, Paliers, Réacteurs).
 *
 * Usage: npm run centrales
 */
class CentralesSync {
  static readonly spreadsheetId = "1V_xO0Yj9xuti6TI4TiVrERyhY8I3Gde9yESFqUZ6BZ8"
  static readonly sourceUrl = `https://docs.google.com/spreadsheets/d/${CentralesSync.spreadsheetId}`
  static readonly output = new URL("./centrales.json", import.meta.url)

  async sheet(name: string): Promise<Row[]> {
    const res = await fetch(`${CentralesSync.sourceUrl}/gviz/tq?sheet=${encodeURIComponent(name)}&tqx=out:json`)
    if (!res.ok) {
      throw new Error(`Could not load sheet "${name}": ${res.status}`)
    }
    const text = await res.text()
    const table = JSON.parse(text.substring(47).slice(0, -2)).table
    // Google turns the first row into column labels when it looks like a header, else leaves it in the rows
    const hasLabels = table.cols.some((col: { label: string }) => col.label)
    const rows: Row[] = table.rows.map((row: { c: ({ v: string | number } | null)[] }) => row.c.map(c => c ? c.v : null))
    return hasLabels ? rows : rows.slice(1)
  }

  async run() {
    const [typeRows, communeRows, centraleRows, palierRows, reactorRows] = await Promise.all(
      ["Types réacteur", "Communes", "Centrales", "Paliers", "Réacteurs"].map(name => this.sheet(name)))
    const types = typeRows.map(([acronym, label]) => ({acronym, label}))
    const typeOfPalier = new Map(palierRows.map(([palier, type]) => [palier, type]))
    const reactors = reactorRows.map(r => {
      const palier = r[4] as string
      const type = types.some(t => t.acronym === palier) ? palier : typeOfPalier.get(palier)
      if (!type) {
        throw new Error(`Unknown palier "${palier}" for ${r[0]}`)
      }
      const end = r[11]
      return {name: r[0], centrale: r[1], palier, type, power: r[7], start: r[10], ...(end ? {end} : {})}
    })
    const centrales = centraleRows
      .filter(([name]) => reactors.some(r => r.centrale === name))
      .map(([name, commune]) => {
        const place = communeRows.find(c => c[0] === commune)
        if (!place) {
          throw new Error(`Could not find commune "${commune}" of centrale "${name}"`)
        }
        return {name, commune, department: place[3], lat: Number(place[1]), lon: Number(place[2])}
      })
    const unknown = reactors.filter(r => !centrales.some(c => c.name === r.centrale))
    if (unknown.length > 0) {
      throw new Error(`Reactors without a centrale: ${unknown.map(r => r.name).join(", ")}`)
    }
    await writeFile(CentralesSync.output, JSON.stringify({source: CentralesSync.sourceUrl, types, centrales, reactors}, null, 1) + "\n")
    console.log(`${reactors.length} reactors, ${centrales.length} centrales`)
  }
}

new CentralesSync().run().catch(e => {
  console.error(e)
  process.exit(1)
})
