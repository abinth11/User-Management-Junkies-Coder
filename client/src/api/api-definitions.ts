import { AxiosResponse } from "axios"
import { IUser } from "../../types/user"

abstract class User {
    protected Endpoints = {
        ADD_USER: 'api/v1/users/save',
        LIST_USERS:'api/v1/users/list'
    }
    constructor(){}

    abstract saveUser(user:IUser):Promise<AxiosResponse|Error>
    abstract listUsers():Promise<IUser[]|Error>

}

export default User