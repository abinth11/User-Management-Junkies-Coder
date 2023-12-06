import expressAsyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { IUser } from '../../types/user'
import { addUserUseCase } from '../../application/user-cases/add-user'
import HttpStatusCodes from '../../constants/http-status-codes'
import UserRepositoryInterface from '../../application/repositories/user-repo-interface'
import UserRepository from '../../frameworks/databases/mongodb/repositories/user-repository'
import { findAllUsersUseCase } from '../../application/user-cases/find-user'
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

    return {
        addUser,
        findAllUsers
    }

}

export default userController