import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})

public interface PaymentData{
    orderId: string,
    paymentId: string,
    status: string;
}
export class PaymentsService { 

    constructor() {}

    public changeOrderStatus(paymentData: PaymentData, authToken: String){
        


    }


}