import User from "../../entities/user";
import UserRepository from "../../frameworks/databases/mongodb/repositories/user-repository";

export const userRepositoryInterface = (repository: ReturnType<UserRepository>) => {

    const addUser = (user: User) => repository.addUser(user)

    const findAllUsers = () => repository.findAllUsers()

    const findUserByEmail = (email:string) => repository.findUserByEmail(email)

    const updateUser = (userId:string,user:User) => repository.updateUser(userId,user)

    const deleteUser = (userId:string) => repository.deleteUser(userId)

    const findById = (id:string) => repository.findUserById(id)

    return {
        addUser,
        findAllUsers,
        findUserByEmail,
        updateUser,
        deleteUser,
        findById
    }
}

type UserRepositoryInterface = typeof userRepositoryInterface
export default UserRepositoryInterface