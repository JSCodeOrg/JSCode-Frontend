import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filtercard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filtercard.component.html',
  styleUrl: './filtercard.component.scss'
})
export class FilterCard implements OnInit {
  categoriasConProductos: {nombre: string, productos: any[]}[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getCategoriesConProductos();
  }

  async getCategoriesConProductos() {
    const response = await this.productService.getCategories();
    const categorias = response.data.data; 

    const resultados = await Promise.all(
      categorias.map(async (categoria: any) => {
        const productosResp = await this.productService.getCarruselProducts(categoria.id);
        return {
          nombre: categoria.nombreCategoria,
          productos: productosResp.data
        };
      })
    );

    this.categoriasConProductos = resultados;
  }
}