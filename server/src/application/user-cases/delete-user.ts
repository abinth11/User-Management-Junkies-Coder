import UserRepositoryInterface from "../repositories/user-repo-interface";
import AppError from "../../utils/app-error";
import HttpStatusCodes from "../../constants/http-status-codes";

export const deleteUserUseCase = async (
    userId: string,
    repository: ReturnType<UserRepositoryInterface>
) => {

    const alreadyExists = await repository.findById(userId)
    if (!alreadyExists) {
        throw new AppError("This user does not exist", HttpStatusCodes.NOT_FOUND)
    }
    await repository.deleteUser(userId)

}