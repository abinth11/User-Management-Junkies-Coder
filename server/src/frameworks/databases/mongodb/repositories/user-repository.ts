import User from "@src/entities/user";
import Users from "../models/user";

export const userRepository = () => {

    const addUser = async (user: User) => {

        const newUser = new Users(user)
        await newUser.save()
    }

    const findAllUsers = async () => {
        const result: User[] = await Users.find().lean()
        return result
    }

    const findUserByEmail = async (email:string) => {
        const user:User|null = await Users.findOne({email})
        return user
    }

    return {
        addUser,
        findAllUsers,
        findUserByEmail
    }
}

type UserRepository = typeof userRepository
export default UserRepository