import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.scss'
})
export class CarruselComponent implements OnInit {
  paginatedProducts: any[] = [];
  currentPageByCategory: { [key: string]: number } = {};
  itemsPerPage: number = 5;

  categoriasConProductos: {nombre: string, productos:any}[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getCategoriesConProductos();
    };

  async getCategoriesConProductos() {
  const response = await this.productService.getCategories();
  const categorias = response.data.data; 

  const resultados = await Promise.all(
    categorias.map(async (categoria: any) => {
      const productosResp = await this.productService.getCarruselProducts(categoria.id);
      return {
        nombre: categoria.nombreCategoria, // ← nombre correcto
        productos: productosResp.data
      };
    })
  );

  this.categoriasConProductos = resultados;
  }


  getPaginatedProducts(categoria: string, productos: any[]): any[] {
    const page = this.currentPageByCategory[categoria] || 1;
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return productos.slice(start, end);
  }

  goToPage(categoria: string, page: number) {
    const totalPages = this.getTotalPages(categoria);
    if (page >= 1 && page <= totalPages) {
      this.currentPageByCategory[categoria] = page;
    }
  }

  getTotalPages(categoria: string): number {
    const categoriaData = this.categoriasConProductos.find(cat => cat.nombre === categoria);
    return categoriaData ? Math.ceil(categoriaData.productos.length / this.itemsPerPage) : 0;
  }
}
