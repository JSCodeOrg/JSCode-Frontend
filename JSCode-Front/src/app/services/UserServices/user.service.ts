import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private GestionUsuariosApi = environment.GestionUsuariosUrl

    constructor() { }

    loginUser(userData: any) {
        return axios.post(`${this.GestionUsuariosApi + '/auth/login'}`, userData, {
            withCredentials: true
        });
    }

    recoverPassword(recoverPasswordData: any) {
        console.log(recoverPasswordData);
        return axios.post(`${this.GestionUsuariosApi + '/users/recoverpassword'}`, recoverPasswordData)
    }

    validateCode(validationData: any) {
        console.log(validationData);
        return axios.post(`${this.GestionUsuariosApi + '/users/checkrecoverycode'}`, validationData, {
            withCredentials: true,
        })
    }
}
