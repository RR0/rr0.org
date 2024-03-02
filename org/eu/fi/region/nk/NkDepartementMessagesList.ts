import { FinlandDepartementCode } from "../FinlandDepartementCode"
import { OrganizationMessages } from "../../../../OrganizationMessages"

export enum NkDepartementCode {
  pk = FinlandDepartementCode.pk
}

export type NkDepartementMessagesList
  = { [key in NkDepartementCode]: OrganizationMessages }
