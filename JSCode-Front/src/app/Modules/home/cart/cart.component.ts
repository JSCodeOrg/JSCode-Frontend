import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ProductService } from '../../../core/services/products.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../Shared/Components/button/button.component';

interface ProductsOnCartInfo {
  nombre: string,
  precio: string,
  cantidad: number,
  imageUrl: string,
  seleccionado?: boolean

}

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  @Output() close = new EventEmitter<void>();

  productsOnUserCart: ProductsOnCartInfo[] = [];
  selectedProducts: ProductsOnCartInfo[] = [];

  constructor(private productService: ProductService) { }

  async getUserToken() {

    const authToken = sessionStorage.getItem('authToken');

    if (!authToken) {
      return;
    }
    this.getUserCart(authToken);

  }


  async getUserCart(authToken: String) {
    const userCart = await this.productService.getUserCart(authToken);
    this.productsOnUserCart = userCart.data.data.productos.map((p: ProductsOnCartInfo) => ({
      ...p,
      seleccionado: false
    }));
    console.log(this.productsOnUserCart)
  }

  toggleSeleccion(product: ProductsOnCartInfo) {
  product.seleccionado = !product.seleccionado;

  if (product.seleccionado) {
    if (!this.selectedProducts.includes(product)) {
      this.selectedProducts.push(product);
    }
  } else {
    this.selectedProducts = this.selectedProducts.filter(p => p !== product);
  }
  console.log(this.selectedProducts)
}

  onBuy() {
    return;
  }

  closeCart() {
    this.close.emit();

  }

  ngOnInit(): void {
    this.getUserToken();
  }

}
