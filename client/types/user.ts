export interface IUser {
    _id?:string
    name:string;
    email:string;
    title:string;
    role:string;
    password?:string;
    createdAt?:Date;
}