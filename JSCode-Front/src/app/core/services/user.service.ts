import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private GestionUsuariosApi = environment.GestionUsuariosUrl
    private GestionUsuariosLocal = environment.GestionUsuariosLocal

    constructor() { }


    //TODO: Mejorar las entradas, no usamos TS para usar any
    //TODO: Migrar a httpClient de Angular en vez de Axios
    
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

    setNewPassword(newPasswordData: any) {
        return axios.put(`${this.GestionUsuariosApi + '/users/createnewpassword'}`, newPasswordData, {
            withCredentials: true,
        })
    }

    getUserData(userToken: any){
        return axios.get(`${this.GestionUsuariosApi + '/auth/me'}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            },
            withCredentials: true,
        })
    }

    registerUser(newUserData: any){
        return axios.post(`${this.GestionUsuariosApi + '/users/register'}`, newUserData)
    }
}
