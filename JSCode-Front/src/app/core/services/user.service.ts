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
        return axios.post(`${this.GestionUsuariosApi + '/usuarios/auth/login'}`, userData, {
            withCredentials: true
        });
    }

    recoverPassword(recoverPasswordData: any) {
        console.log(recoverPasswordData);
        return axios.post(`${this.GestionUsuariosApi + '/usuarios/recoverpassword'}`, recoverPasswordData)
    }

    validateCode(validationData: any) {
        console.log(validationData);
        return axios.post(`${this.GestionUsuariosApi + '/usuarios/checkrecoverycode'}`, validationData, {
            withCredentials: true,
        })
    }

    setNewPassword(newPasswordData: any) {
        return axios.put(`${this.GestionUsuariosApi + '/usuarios/createnewpassword'}`, newPasswordData, {
            withCredentials: true,
        })
    }

    getUserData(userToken: any){
        return axios.get(`${this.GestionUsuariosApi + '/usuarios/auth/me'}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            },
            withCredentials: true,
        })
    }

    registerUser(newUserData: any){
        return axios.post(`${this.GestionUsuariosApi + '/usuarios/users/register'}`, newUserData)
    }

    verifyAccount(token: string){
        return axios.post(`${this.GestionUsuariosApi}/usuarios/users/verify?token=${token}`)
    }

    changeDefaultInfo(userData: any, token: String){
        console.log(token)
        console.log(userData)
        return axios.put(`${this.GestionUsuariosApi}/usuarios/users/updateinfo`, userData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true,
        })
    }

    getUserInfo(token: String){
        return axios.get(`${this.GestionUsuariosApi}/usuarios/users/getuser`, {
            headers: {
                Authorization: `Bearer ${token}`
            }, withCredentials: true,
        })
    }
    createUserRole(userData: any){
        console.log(userData)
        return axios.post(`${this.GestionUsuariosApi}/usuarios/users/createuser`, userData, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            },
            withCredentials: true,
        })
    }
}
