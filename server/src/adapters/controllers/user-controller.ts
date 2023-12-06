import expressAsyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { IUser } from '../../types/user'
import { addUserUseCase } from '../../application/user-cases/add-user'
import HttpStatusCodes from '../../constants/http-status-codes'
import UserRepositoryInterface from '../../application/repositories/user-repo-interface'
import UserRepository from '../../frameworks/databases/mongodb/repositories/user-repository'
import { findAllUsersUseCase } from '../../application/user-cases/find-user'
import { updateUserUseCase } from '../../application/user-cases/update-user'
import { deleteUserUseCase } from '../../application/user-cases/delete-user'
const userController = (
    userRepositoryInterface: UserRepositoryInterface,
    userRepositoryImpl: UserRepository
) => {

    const dbRepositoryUser = userRepositoryInterface(userRepositoryImpl())

    const addUser = expressAsyncHandler(async (req: Request, res: Response) => {
        const user: IUser = req.body
        await addUserUseCase(user, dbRepositoryUser)
        res.status(HttpStatusCodes.CREATED).json({
            status: "success",
            message: "Successfully created new user",
            data: null
        })
    })

    const findAllUsers = expressAsyncHandler(async (req: Request, res: Response) => {
        const users = await findAllUsersUseCase(dbRepositoryUser)
        res.status(HttpStatusCodes.OK).json({
            status: "success",
            message: "Successfully created new user",
            data: users
        })
    })

    const updateUser = expressAsyncHandler(async (req: Request, res: Response) => {
        const user: IUser = req.body
        const userId = req.params.userId
        await updateUserUseCase(userId, user, dbRepositoryUser)
        res.status(HttpStatusCodes.CREATED).json({
            status: "success",
            message: "Successfully updated the user",
            data: null
        })
    })

    const deleteUser = expressAsyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.userId
        await deleteUserUseCase(userId, dbRepositoryUser)
        res.status(HttpStatusCodes.CREATED).json({
            status: "success",
            message: "Successfully deleted the user",
            data: null
        })
    })

    return {
        addUser,
        findAllUsers,
        updateUser,
        deleteUser
    }

}

export default userController