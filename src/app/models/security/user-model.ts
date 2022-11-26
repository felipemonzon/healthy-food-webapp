import { AuthorityModel } from "../administration/authority.model";

export interface UserModel {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    displayName: string;
    password?: string;
    cel: string;
    email: string;
    genre: string;
    active: boolean;
    authorities: AuthorityModel[];
    branchOfficeName: string;
    branchOfficeId: number;
    profiles: AuthorityModel[];
}
