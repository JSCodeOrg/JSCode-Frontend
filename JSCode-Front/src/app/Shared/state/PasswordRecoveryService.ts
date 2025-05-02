import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class PasswordRecoveryService{
    private recoverData: {mail: string} = {mail: ''};

    setRecoverData(data: {mail: string}) {
        this.recoverData = data;
    }

    getRecoverData(){
        return this.recoverData;
    }
}