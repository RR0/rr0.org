const displinesJSON = require('./disciplines.json')

export class ScienceModule {
  disciplines: any[]

  constructor() {
    this.disciplines = displinesJSON
  }
}

const science = new ScienceModule()
export default science
