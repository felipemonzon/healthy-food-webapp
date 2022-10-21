import { UserModel } from "../security/user-model";

export interface OfficeModel {
    id: number;
    name: string;
    address: string;
    phone: string;
    manager: UserModel;
    active: boolean;
}