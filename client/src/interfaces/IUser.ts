export interface IUser {
    _id: string,
    name: string,
    email: string,
    iat?: number,
    exp?: number
}