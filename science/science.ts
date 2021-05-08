const displinesJSON = require('/science/disciplines.json')

export class ScienceModule {
  disciplines: any[]

  constructor() {
    this.disciplines = JSON.parse(displinesJSON)
  }
}

const science = new ScienceModule()
export default science
