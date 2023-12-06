import { AxiosResponse } from "axios";
import { IUser } from "../../types/user";
import User from "./api-definitions";
import { axiosInstance } from "./api-config";

class UserApi extends User {
    async saveUser(user: IUser): Promise<AxiosResponse<any, any> | Error> {
        try {
            const response = await axiosInstance.post(this.Endpoints.ADD_USER, user)
            console.log(response)
            return response.data
        } catch (error:any) {
            throw error.response.data
        }
    }

    async listUsers(): Promise<IUser[] | Error> {
        try {
            const response = await axiosInstance.get(this.Endpoints.LIST_USERS)
            return response.data.data as IUser[]
        } catch (error:any) {
            throw error.response.data
        }
    }
}

export default UserApi