export interface IUser {
    _id: string;
    fullName: string;
    email?: string;
    avatarUrl?: string;
}

export interface IComment {
    user: IUser,
    text: string
}
