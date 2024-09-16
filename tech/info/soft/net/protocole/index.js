var portIndex

const tableBody = document.querySelector("#port-table tbody")
const portSearchInput = document.querySelector("#port-form input[type='search']")
portSearchInput.disabled = false
portSearchInput.setAttribute("placeHolder", "nom, port...")

function portSearchChange (filter) {
  tableBody.innerHTML = ""
  const input = (portSearchInput.value || "").toLowerCase().trim()

  /**
   *
   * @param {HTMLTableRowElement} row
   * @param {object} obj
   * @param {string} field
   * @param {HTMLElement | undefined} wrapper
   */
  function addCol (row, obj, field, wrapper = undefined) {
    const descCol = document.createElement("td")
    const value = obj[field]
    descCol.className = field
    if (wrapper) {
      wrapper.innerText = value
      descCol.append(wrapper)
    } else {
      descCol.innerText = value
    }
    row.append(descCol)
  }

  const entries = Object.entries(portIndex.ports)

  function addRow (portItem) {

    function add (i) {
      const item = filter(i)
      if (item) {
        const desc = item.description
        const port = item.port
        if (desc.toLowerCase().indexOf(input) >= 0
          || port.toLowerCase().indexOf(input) >= 0
        ) {
          const row = document.createElement("tr")
          addCol(row, item, "description")
          addCol(row, item, "port", document.createElement("code"))
          addCol(row, item, "status")
          addCol(row, item, "tcp")
          addCol(row, item, "udp")
          tableBody.append(row)
        }
      }
    }

    if (Array.isArray(portItem)) {
      for (const filteredElement of portItem) {
          add(filteredElement)
        }
      } else {
      add(portItem)
      }
  }

  for (let i = 0; i < entries.length; i++) {
    const portItems = entries[i]
    for (const portItem of portItems) {
      if (typeof portItem === "object") {
        addRow(portItem)
      }
    }
  }
}

let portLoading = false

export function portSearchLoad (filter) {
  portSearchInput.oninput = (event) => portSearchChange(filter)
  if (!portIndex && !portLoading) {
    portLoading = true
    fetch("https://raw.githubusercontent.com/djcas9/ports.json/master/ports.json").then(async (response) => {
      if (response.ok) {
        portIndex = await response.json()
        portSearchChange(filter)
      }
      portLoading = false
    })
  }
}
