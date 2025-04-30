import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService{
    private apiUrl = environment.backendUrl

    constructor(){}

    loginUser(userData: any){
    return axios.post(`${this.apiUrl}`, userData, {
        withCredentials: true
    }); 

    
  }
}