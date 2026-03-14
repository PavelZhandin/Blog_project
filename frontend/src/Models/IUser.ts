export interface IUser {
    fullName: string;
    avatarUrl?: string;
}

export interface IComment {
    user: IUser,
    text: string
}
