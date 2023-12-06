import { AxiosResponse } from "axios"
import { IUser } from "../types/user"

abstract class User {
    protected Endpoints = {
        ADD_USER: 'api/v1/users/save',
        LIST_USERS:'api/v1/users/list',
        UPDATE_USER:'api/v1/users/update',
        DELETE_USER:'api/v1/users/delete'
    }
    constructor(){}

    abstract saveUser(user:IUser):Promise<AxiosResponse|Error>
    abstract listUsers():Promise<IUser[]|Error>
    abstract updateUser(userId:string,user:IUser):Promise<AxiosResponse|Error>
    abstract deleteUser(userId:string):Promise<AxiosResponse|Error>
}

export default User