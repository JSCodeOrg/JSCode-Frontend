import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../Shared/Components/header/header.component';
import { FooterComponent } from '../../Shared/Components/footer/footer.component';
import { SearchInputComponent } from '../../Shared/Components/search/search.component';
import { FilterPanelComponent } from '../../Shared/Components/filter/filter.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../core/services/products.service';
import { InfoProductComponent } from "../../Shared/Components/infoproduct/infoproduct.component";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precioCompra: number;
  imagenes: string[];
  nombreCategoria: string;

}

@Component({
  selector: 'app-home-search',
  standalone: true,
  templateUrl: './homesearch.component.html',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SearchInputComponent,
    FilterPanelComponent,
    InfoProductComponent
],
  styleUrls: ['./homesearch.component.scss']
})
export class HomeSearchComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) { }
  selectedProduct: any = null;

  products: Producto[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  lastSearch: string = '';
  size = 20;


  ngOnInit(): void {
    this.buscarProductos()
  }


  buscarProductos() {
    this.route.queryParams.subscribe(params => {
      const searchTerm = params['q'];
      if (searchTerm) {
        this.solicitarBusqueda(searchTerm);
      }
    })
  }

  async solicitarBusqueda(searchTerm: string, page: number = 0) {
    const productos = await this.productService.searchProducts(searchTerm, page, this.size);
    if (productos.data.content.length === 0) {
      alert("No se encontraron resultados");
      this.products = [];
      this.totalPages = 0;
      this.currentPage = 0;
      console.log(productos.data);
    } else {
      this.products = productos.data.content;
      this.totalPages = productos.data.totalPages;
      this.currentPage = productos.data.number;
      console.log(this.currentPage)
    }
  }

  nuevaPagina(nuevaPagina: number) {
    console.log('paginas', this.totalPages)
    console.log('actual:', this.currentPage)
    if (nuevaPagina >= 0 && nuevaPagina < this.totalPages) {
      this.currentPage = nuevaPagina;
      this.solicitarBusqueda(this.lastSearch, this.currentPage);
    }
  }

  openProductModal(id: any) {
    this.selectedProduct = id;
  }

  closeProductModal() {
    this.selectedProduct = null;
  }
}
