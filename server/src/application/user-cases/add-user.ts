import { IUser } from "../../types/user";
import UserRepositoryInterface from "../repositories/user-repo-interface";
import AppError from "../../utils/app-error";
import HttpStatusCodes from "../../constants/http-status-codes";

export const addUserUseCase = async (
    user: IUser,
    repository: ReturnType<UserRepositoryInterface>
) => {

    const alreadyExists = await repository.findUserByEmail(user.email)
    if (alreadyExists) {
        throw new AppError("User with same email already exists,please login", HttpStatusCodes.CONFLICT)
    }

    await repository.addUser(user)

}