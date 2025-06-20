import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "../../../environments/environment";

interface ProductsOnCartInfo {
    id: number,
    nombre: string,
    precio: string,
    cantidad: number,
    imageUrl: string,
    seleccionado?: boolean
}

interface ProductReadyToBuy {
    nombre: string,
    cantidad: number,
    precioUnitario: number,
}

interface EditedCart {
    productosEditados: ProductsOnCartInfo[],
    productosEliminados: ProductsOnCartInfo[],
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private GestionProductosApi = environment.GestionProductosUrl;
    private categoriesCache: any[] = [];

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

    searchProducts(searchTerm: string, page: number = 0, size: number = 20) {
        return axios.get(`${this.GestionProductosApi}/inventario/productos/buscar`, {
            params: {
                texto: searchTerm,
                page: page,
                size: size
            }
        })
    }

    getProductInfo(product_id: number) {
        return axios.get(`${this.GestionProductosApi}/inventario/productos/ver/${product_id}`)
    }

    changeProductInfo(product_id: number, token: string, productData: any) {
        const formData = new FormData();

        formData.append('producto', new Blob([JSON.stringify(productData)], {
            type: 'application/json'
        }));

        if (productData.imagenesAñadidas && productData.imagenesAñadidas.length > 0) {
            productData.imagenesAñadidas.forEach((file: File) => {
                formData.append('imagenes', file);
            });
        }

        return axios.put(`${this.GestionProductosApi}/inventario/productos/actualizar/${product_id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

    }

    addProductToCart(productData: any, authToken: String) {
        console.log("info es", productData);
        return axios.post(`${this.GestionProductosApi}/inventario/carrito`, productData, {
            headers:
                { Authorization: `Bearer ${authToken}` }
        })

    }

    getUserCart(authToken: String) {
        return axios.get(`${this.GestionProductosApi}/inventario/carrito`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
    }

    saveUserCart(authToken: String, editedCart: EditedCart) {
        return axios.put(`${this.GestionProductosApi}/inventario/carrito`, editedCart, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }

        })

    }

    buy(authToken: String, productsList: ProductReadyToBuy[]){
        return axios.post(`${this.GestionProductosApi}/ordenes/pagos`, productsList, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        } )

    }
}