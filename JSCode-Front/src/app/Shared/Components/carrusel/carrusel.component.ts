import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './carrusel.component.html',
  styleUrl: './carrusel.component.scss'
})
export class CarruselComponent implements OnInit {

  products: any[] = [];
  paginatedProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private productService: ProductService) { }



  ngOnInit(): void {
    this.getProducts();

  }

  getProducts() {
    this.productService.getCarruselProducts(1).then((response => {
      this.products = response.data;
      this.updatePaginatedProducts();
    }))
  }

  updatePaginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(start, end);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedProducts();
  }

  totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }
}
