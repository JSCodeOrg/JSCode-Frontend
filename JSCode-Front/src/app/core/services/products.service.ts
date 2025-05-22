import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private GestionProductosApi = environment.GestionProductosUrl

    constructor() { }

    getCategories() {
        return axios.get(`${this.GestionProductosApi}/inventario/productos/categorias`)
    }
    getCarruselProducts(categoria_id: number) {
        return axios.get(`${this.GestionProductosApi}/inventario/productos/obtener/categoria?categoria_id=${categoria_id}`);
    }

    getFilterProducts(categoria?: string, precioMin?: number, precioMax?: number) {
        const params: any = {};

        if (categoria) params.categoria = categoria;
        if (precioMin !== undefined && precioMin !== null) params.precioMin = precioMin;
        if (precioMax !== undefined && precioMax !== null) params.precioMax = precioMax;

        return axios.get(`${this.GestionProductosApi}/inventario/productos/filtrar`, { params });
    }

    searchProducts(searchTerm: string, page: number = 0, size: number = 50) {
        return axios.get(`${this.GestionProductosApi}/inventario/productos/buscar`, {
            params: {
                texto: searchTerm,
                page: page,
                size: size
            }
        })
    }
}