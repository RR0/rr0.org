export interface SearchItem {
  link: string
  htmlTitle: string
  snippet: string
}

export interface SearchResults {
  searchInformation: {
    totalResults: number
  }
  items: SearchItem[]
}

export class SearchService {

  async search(toSearch: string): Promise<SearchResults> {
    const response = await fetch("https://www.googleapis.com/customsearch/v1?key=AIzaSyCBM8ZUsYyJNdwKTKxoARTr673_8IaWKSo&cx=014557949845581334805:gdnqsazbu8i&q=" + toSearch)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(`Could not search: ${response.statusText} (${response.status}`)
    }
  }
}
