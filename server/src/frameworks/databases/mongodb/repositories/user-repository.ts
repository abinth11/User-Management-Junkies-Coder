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

    const findUserById = async (id:string) => {
        const user = Users.findById({_id:id})
        return user
    }

    const updateUser = async (userId:string,user:User)=>{
        await Users.updateOne({_id:userId},{$set:{...user}})
    }

    const deleteUser = async (userId:string)=>{
        await Users.deleteOne({_id:userId})
    }

    return {
        addUser,
        findAllUsers,
        findUserByEmail,
        updateUser,
        deleteUser,
        findUserById
    }
}

type UserRepository = typeof userRepository
export default UserRepository