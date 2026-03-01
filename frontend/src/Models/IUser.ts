export interface IUser {
    fullName: string;
    avatarUrl: string | undefined;
}

export interface IComment {
    user: IUser,
    text: string
}
