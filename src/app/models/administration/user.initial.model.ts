import { OfficeModel } from "../catalog/office.model";
import { AuthorityModel } from "./authority.model";

export interface UserInitialModel {
    authorities: AuthorityModel[];
    offices: OfficeModel[]
}