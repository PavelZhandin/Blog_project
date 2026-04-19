import { IUser } from "./IUser";

export interface ILoginData {
    email: string;
    password: string;
}

export interface IRegisterData {
    fullName: string;
    email: string;
    password: string;
}

export interface IAuthResponse {
    user: IUser;
    token: string;
}
