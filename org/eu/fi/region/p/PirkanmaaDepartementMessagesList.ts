import { FinlandDepartementCode } from "../FinlandDepartementCode"
import { OrganizationMessages } from "../../../../OrganizationMessages"

export enum PirkanmaaDepartementCode {
  nwp = FinlandDepartementCode.nwp
}

export type PirkanmaaDepartementMessagesList
  = { [key in PirkanmaaDepartementCode]: OrganizationMessages }
