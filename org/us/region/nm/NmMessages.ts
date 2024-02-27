import { CityMessagesList } from "../../../country/region/department/city/CityMessagesList"

export interface NmMessages {
  title: string
  department: {
    chaves: {
      title: string
      city: CityMessagesList
    }
  }
}
