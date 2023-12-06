import UserRepositoryInterface from "../repositories/user-repo-interface";
export const findAllUsersUseCase = async (
    repository: ReturnType<UserRepositoryInterface>
) => {
    const users = await repository.findAllUsers()
    return users
}