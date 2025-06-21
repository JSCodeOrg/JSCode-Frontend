import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private ApiGateway = environment.GestionUsuariosUrl

    constructor() { }

    loginUser(userData: any) {
        console.log(`${this.ApiGateway + '/usuarios/auth/login'}`)
        return axios.post(`${this.ApiGateway + '/usuarios/auth/login'}`, userData, {
            withCredentials: true
        });
    }

    recoverPassword(recoverPasswordData: any) {
        console.log(recoverPasswordData);
        return axios.post(`${this.ApiGateway + '/usuarios/users/recoverpassword'}`, recoverPasswordData)
    }

    validateCode(validationData: any) {
        console.log(validationData);
        return axios.post(`${this.ApiGateway + '/usuarios/users/checkrecoverycode'}`, validationData, {
            withCredentials: true,
        })
    }

    setNewPassword(newPasswordData: any) {
        return axios.put(`${this.ApiGateway + '/usuarios/users/createnewpassword'}`, newPasswordData, {
            withCredentials: true,
        })
    }

    getUserData(userToken: any) {
        return axios.get(`${this.ApiGateway + '/usuarios/auth/me'}`, {
            headers: {
                Authorization: `Bearer ${userToken}`
            },
            withCredentials: true,
        })
    }

    changeUserData(userToken: string, newData: any) {
        console.log(newData);
        return axios.put(`${this.ApiGateway}/usuarios/users/updateinfo`, newData, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        })

    }

    changeProfileImage(newProfileImage: File, authToken: String) {
        const formData = new FormData();
        formData.append('newImage', newProfileImage);

        return axios.put(`${this.ApiGateway}/usuarios/users/updateprofileimage`, formData, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });
    }

    registerUser(newUserData: any) {
        return axios.post(`${this.ApiGateway + '/usuarios/users/register'}`, newUserData)
    }

    verifyAccount(token: string) {
        return axios.post(`${this.ApiGateway}/usuarios/users/verify?token=${token}`)
    }

    changeDefaultInfo(userData: any, token: String) {
        console.log(token)
        console.log(userData)
        return axios.put(`${this.ApiGateway}/usuarios/users/updateinfo`, userData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true,
        })
    }

    getUserInfo(token: String) {
        return axios.get(`${this.ApiGateway}/usuarios/users/getuser`, {
            headers: {
                Authorization: `Bearer ${token}`
            }, withCredentials: true,
        })
    }
    createUserRole(userData: any) {
        console.log(userData)
        return axios.post(`${this.ApiGateway}/usuarios/users/createuser`, userData, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            },
            withCredentials: true,
        })
    }

    updateDeliveryInformation(deliveryData: any, token: String){
        return axios.put(`${this.ApiGateway}/usuarios/users/repartidor/actualizar`, deliveryData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: true,
        })
    }
}
