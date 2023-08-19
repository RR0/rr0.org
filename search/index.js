var siteIndex

function siteSearchChange(e) {
  if (e.inputType === "insertReplacementText" || e.inputType == null) {
    const value = e.target.value.trim()
    const pageIndex = siteIndex.pages.findIndex(page => page.title === value)
    if (pageIndex >= 0) {
      const page = siteIndex.pages[pageIndex]
      window.location.href = `/${page.url}`
    }
  }
}

let loading = false

function siteSearchLoad() {
  const datalist = document.querySelector("#search-site-values")
  if (!siteIndex && !loading) {
    loading = true
    fetch("/search/index.json").then(async (response) => {
      if (response.ok) {
        siteIndex = await response.json()
        for (const page of siteIndex.pages) {
          const option = document.createElement("option")
          option.value = page.title
          datalist.append(option)
        }
      }
      loading = false
    })
  }
}

const search = document.querySelector("#main-nav .search")
search.onmouseover = siteSearchLoad
const searchInput = document.querySelector("#search-site")
searchInput.disabled = false
searchInput.setAttribute("placeHolder", "Recherche")
searchInput.oninput = (event) => siteSearchChange(event)
