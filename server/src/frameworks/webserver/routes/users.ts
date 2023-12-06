import userController from "../../../adapters/controllers/user-controller";
import { userRepositoryInterface } from "../../../application/repositories/user-repo-interface";
import { userRepository } from "../../../frameworks/databases/mongodb/repositories/user-repository";
import express from 'express'

const userRouter = () =>{
    const controller = userController(userRepositoryInterface,userRepository)
    const router = express.Router()

    router.post('/save',controller.addUser)
    router.get('/list',controller.findAllUsers)
    router.put('/update/:userId',controller.updateUser)
    router.delete('/delete/:userId',controller.deleteUser)

    return router
}

export default userRouter