export class Sources {
  constructor() {
    this.primaryReferences = {}
    this.newspapersAndFootnotes = {}
    this.otherDatabasesAndWebsites = {}
    this.otherPeriodicals = {}
    this.misc = {}
    this.discredited = []
  }

  addDiscredited(line) {
    this.discredited.push(line.substring(2))
  }

  addSource(arr, line) {
    const ref = parseInt(line.substring(1, 4), 0)
    arr[ref] = line.substring(5)
  }

  open(sourcesReader) {
    return new Promise((resolve, reject) => {
      sourcesReader
        .on("line", line => {
          switch (line.charAt(0)) {
            case "/":
              this.addSource(this.primaryReferences, line)
              break
            case "$":
              this.addSource(this.newspapersAndFootnotes, line)
              break
            case "+":
              this.addSource(this.otherDatabasesAndWebsites, line)
              break
            case "%":
              this.addSource(this.otherPeriodicals, line)
              break
            case "#":
              this.addSource(this.misc, line)
              break
            case "!":
              this.addDiscredited(line)
              break
          }
        })
        .on("close", resolve)
        .on("error", err => reject(err))
    })
  }

  getReference(ref, refIndex) {
    let reference
    switch (ref) {
      case 93:
        reference = this.newspapersAndFootnotes[refIndex]
        break
      case 96:
        reference = this.otherDatabasesAndWebsites[refIndex]
        break
      case 97:
        reference = this.otherPeriodicals[refIndex]
        break
      case 98:
        reference = this.misc[refIndex]
        break
      default:
        reference = `${this.primaryReferences[ref]}, page n°${refIndex}`
    }
    return reference
  }
}

//# sourceMappingURL=Sources.js.map
