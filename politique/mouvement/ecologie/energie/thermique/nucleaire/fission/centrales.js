class CentralesList {
  constructor (root, data, year = new Date().getFullYear()) {
    this.root = root
    this.data = data
    this.year = year
    this.select = root.querySelector("select")
    this.closedCheckbox = root.querySelector("input[type=checkbox]")
    this.summary = root.querySelector(".summary")
    this.list = root.querySelector("ul")
  }

  start () {
    for (const type of this.data.types) {
      const option = document.createElement("option")
      option.value = type.acronym
      option.textContent = `${type.label} (${type.acronym})`
      this.select.append(option)
    }
    const refresh = () => this.display(this.select.value, this.closedCheckbox.checked)
    this.select.addEventListener("change", refresh)
    this.closedCheckbox.addEventListener("change", refresh)
    refresh()
  }

  isClosed (reactor) {
    return reactor.end !== undefined && reactor.end <= this.year
  }

  static plural (word, count) {
    return `${count} ${word}${count > 1 ? "s" : ""}`
  }

  static element (tag, text, className) {
    const el = document.createElement(tag)
    if (text) {
      el.textContent = text
    }
    if (className) {
      el.className = className
    }
    return el
  }

  /** @returns {{type: string, reactors: object[]}[]} */
  groupByType (reactors) {
    const groups = []
    for (const reactor of reactors) {
      let group = groups.find(g => g.type === reactor.type)
      if (!group) {
        group = {type: reactor.type, reactors: []}
        groups.push(group)
      }
      group.reactors.push(reactor)
    }
    return groups
  }

  period (start, end) {
    if (end !== undefined) {
      return `de ${start} à ${end}`
    }
    return start <= this.year ? `depuis ${start}` : `à partir de ${start}`
  }

  duration (start, end) {
    if (start > this.year) {
      return `dans ${start - this.year} ans`
    }
    return end !== undefined ? `pendant ${end - start} ans` : `depuis ${this.year - start} ans`
  }

  groupElement (group) {
    const start = Math.min(...group.reactors.map(r => r.start))
    const ends = group.reactors.map(r => r.end)
    const end = ends.every(e => e !== undefined) ? Math.max(...ends) : undefined
    const power = group.reactors.reduce((total, r) => total + r.power, 0)
    const label = this.data.types.find(t => t.acronym === group.type).label
    const span = CentralesList.element("span", undefined,
      [start > this.year ? "not-yet" : "", end !== undefined && end <= this.year ? "closed" : ""].join(" ").trim())
    const abbr = CentralesList.element("abbr", group.type)
    abbr.title = label
    span.append(`${CentralesList.plural("réacteur", group.reactors.length)} `, abbr,
      ` (${power} MWe) ${this.period(start, end)} (${this.duration(start, end)})`)
    return span
  }

  centraleElement (centrale, groups) {
    const li = document.createElement("li")
    const place = CentralesList.element("a", centrale.commune, "place")
    place.href = `https://maps.google.com/?q=${encodeURIComponent(`${centrale.lat},${centrale.lon}`)}`
    place.title = `${centrale.commune}, ${centrale.department}`
    li.append(CentralesList.element("b", centrale.name), " (", place, ") ")
    groups.forEach((group, i) => {
      if (i > 0) {
        li.append(" + ")
      }
      li.append(this.groupElement(group))
    })
    return li
  }

  display (type, showClosed) {
    this.list.replaceChildren()
    let centraleCount = 0
    let activeCount = 0
    for (const centrale of this.data.centrales) {
      const reactors = this.data.reactors.filter(r => r.centrale === centrale.name && (!type || r.type === type) && (showClosed || !this.isClosed(r)))
      if (reactors.length > 0) {
        this.list.append(this.centraleElement(centrale, this.groupByType(reactors)))
        activeCount += reactors.filter(r => !this.isClosed(r) && r.start <= this.year).length
        centraleCount++
      }
    }
    this.summary.textContent = `${CentralesList.plural("réacteur", activeCount)}${type ? " " + type : ""} en service, réparti${activeCount > 1 ? "s" : ""} sur ${CentralesList.plural("centrale", centraleCount)} :`
  }
}

const root = document.querySelector("#centrales")
fetch("centrales.json")
  .then(res => {
    if (!res.ok) {
      throw new Error(`Could not load centrales.json: ${res.status}`)
    }
    return res.json()
  })
  .then(data => new CentralesList(root, data).start())
  .catch(e => {
    root.querySelector("ul").textContent = e.toString()
  })
