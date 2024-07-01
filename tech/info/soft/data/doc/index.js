var fileIndex

const tableBody = document.querySelector("#file-table tbody")
const fileSearchInput = document.querySelector("#file-form input[type='search']")
fileSearchInput.disabled = false
fileSearchInput.setAttribute("placeHolder", "extension, en-tete...")

function fileSearchChange (e) {
  tableBody.innerHTML = ""
  const input = (fileSearchInput.value || "").toLowerCase().trim()

  /**
   *
   * @param {HTMLTableRowElement} row
   * @param {string} value
   * @param {HTMLElement | undefined} wrapper
   */
  function addCol (row, value, wrapper = undefined) {
    const descCol = document.createElement("td")
    if (wrapper) {
      wrapper.innerText = value
      descCol.append(wrapper)
    } else {
      descCol.innerText = value
    }
    row.append(descCol)
  }

  for (const filesig of fileIndex.filesigs) {
    const desc = filesig["File description"]
    const ext = filesig["File extension"]
    const type = filesig["FileClass"]
    const header = filesig["Header (hex)"]
    const headerOffset = filesig["Header offset"]
    const trailer = filesig["Trailer (hex)"]
    if (desc.toLowerCase().indexOf(input) >= 0
      || ext.toLowerCase().indexOf(input) >= 0
      || type.toLowerCase().indexOf(input) >= 0
      || header.toLowerCase().indexOf(input) >= 0
    ) {
      const row = document.createElement("tr")
      addCol(row, desc)
      addCol(row, ext, document.createElement("code"))
      addCol(row, type)
      addCol(row, header, document.createElement("code"))
      addCol(row, headerOffset)
      addCol(row, trailer, document.createElement("code"))
      tableBody.append(row)
    }
  }
}

fileSearchInput.oninput = (event) => fileSearchChange(event)

let fileLoading = false

function fileSearchLoad () {
  if (!fileIndex && !fileLoading) {
    fileLoading = true
    fetch("/tech/info/soft/data/doc/index.json").then(async (response) => {
      if (response.ok) {
        fileIndex = await response.json()
        fileSearchChange()
      }
      fileLoading = false
    })
  }
}

fileSearchLoad()
