import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../../environments/environment";


interface PaymentData{
    orderId: string,
    paymentId: string,
    status: string;
}
@Injectable({
    providedIn: 'root'
})


export class PaymentsService { 
    private GestionUsuariosApi = environment.GestionUsuariosUrl

    constructor() {}

    public changeOrderStatus(paymentData: PaymentData){
        return axios.patch(`${this.GestionUsuariosApi}/ordenes/ordenes`,paymentData,{
          headers: {
                Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
            },
            withCredentials: true,  
        })
    }
}