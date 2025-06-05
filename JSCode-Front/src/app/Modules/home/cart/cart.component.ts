import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../core/services/products.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../Shared/Components/button/button.component';

interface ProductsOnCartInfo {
  id: number,
  nombre: string,
  precio: string,
  cantidad: number,
  imageUrl: string,
  seleccionado?: boolean
}

interface TotalPrice {
  totalPrice: number;
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
  isCartEdited: Boolean = false;
  newTotalPrice: TotalPrice = {
    totalPrice: 0
  };

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
        this.newTotalPrice.totalPrice = this.newTotalPrice.totalPrice + (Number(product.precio) * product.cantidad);
      }
    } else {
      this.selectedProducts = this.selectedProducts.filter(p => p !== product);
      this.newTotalPrice.totalPrice -= (Number(product.precio) * product.cantidad);
    }
    console.log(this.selectedProducts)
  }

  toDecreaseQuantity(product: ProductsOnCartInfo) {
    product.cantidad -= 1;
    this.isCartEdited = true;
    console.log(this.productsOnUserCart);
  }

  toIncreaseQuantity(product: ProductsOnCartInfo) {
    product.cantidad += 1;
    this.isCartEdited = true;
    console.log(this.productsOnUserCart);
  }

  onBuy() {
    console.log("Compra realizada")
    return;
  }

  closeCart() {
    this.close.emit();
  }

  saveCart(){
   console.log("Guardando carrito.");

  }

  ngOnInit(): void {
    this.getUserToken();
  }
}
