import { IUser } from "@src/types/user";
class User {
    name: string;
    email: string;
    title: string;
    role:string;
    createdAt: Date

    constructor({ name,email,title,role}: IUser) {
        this.name = name
        this.email = email
        this.title = title
        this.role = role
        this.createdAt = new Date()
    }
}

export default User;