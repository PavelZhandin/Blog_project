import { IUser } from "./IUser";

export interface IPost {
    _id: string;
    title: string;
    updatedAt: string;
    createdAt: string;
    text: string;
    viewsCount: number;
    user: IUser;
    tags: string[];
    imageUrl?: string;
    
}
