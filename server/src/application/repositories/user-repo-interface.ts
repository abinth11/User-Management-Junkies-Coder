import User from "../../entities/user";
import UserRepository from "../../frameworks/databases/mongodb/repositories/user-repository";

export const userRepositoryInterface = (repository: ReturnType<UserRepository>) => {

    const addUser = (user: User) => repository.addUser(user)

    const findAllUsers = () => repository.findAllUsers()

    const findUserByEmail = (email:string) => repository.findUserByEmail(email)

    return {
        addUser,
        findAllUsers,
        findUserByEmail
    }
}

type UserRepositoryInterface = typeof userRepositoryInterface
export default UserRepositoryInterface