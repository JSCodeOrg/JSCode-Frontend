import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductService{
    private GestionProductosApi = environment.GestionProductosUrl

    constructor(){}

    getCategories(){
        return axios.get(`${this.GestionProductosApi}/productos/categorias`)
    }
    getCarruselProducts(categoria_id: number){
        return axios.get(`${this.GestionProductosApi}/productos/obtener/categoria?categoria_id=${categoria_id}`);
    }
}