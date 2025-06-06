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

interface EditedCart {
  productosEditados: ProductsOnCartInfo[],
  productosEliminados: ProductsOnCartInfo[],
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
  deletedProducts: ProductsOnCartInfo[] = [];
  editedProducts: ProductsOnCartInfo[] = [];
  isCartEdited: Boolean = false;
  newTotalPrice: TotalPrice = {
    totalPrice: 0
  };

  editedCart: EditedCart = {
    productosEditados: [],
    productosEliminados: []
  }

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
    if (product.cantidad > 1) {
      product.cantidad -= 1;
      this.isCartEdited = true;

      const alreadyEdited = this.editedProducts.some(p => p.id === product.id);

      if (!alreadyEdited) {
        this.editedProducts.push(product);
      }
    }

    console.log(this.editedProducts);
  }

  toIncreaseQuantity(product: ProductsOnCartInfo) {
    product.cantidad += 1;
    this.isCartEdited = true;

    const alreadyEdited = this.editedProducts.some(p => p.id === product.id);

    if (!alreadyEdited) {
      this.editedProducts.push(product);
    }

    console.log(this.editedProducts);
  }

  deleteProduct(product: ProductsOnCartInfo) {
    this.isCartEdited = true;

    const alreadyDeleted = this.deletedProducts.some(p => p.id === product.id);

    if (!alreadyDeleted) {
      this.deletedProducts.push(product);
    }
    console.log(this.deletedProducts)
  }

  onBuy() {
    console.log("Compra realizada")
    return;
  }

  closeCart() {
    this.close.emit();
  }

  async saveCart() {
    this.editedCart.productosEditados = this.editedProducts
    this.editedCart.productosEliminados = this.deletedProducts

    const authToken = sessionStorage.getItem('authToken');

    if (!authToken) {
      return;
    }

    const response = await this.productService.saveUserCart(authToken, this.editedCart);

    console.log(response.data)

    if(response.data.status === 200){
      this.isCartEdited = false;
    }

  }

  get visibleProductsOnUserCart(): ProductsOnCartInfo[] {
    return this.productsOnUserCart.filter(
      p => !this.deletedProducts.some(dp => dp.id === p.id)
    );
  }

  ngOnInit(): void {
    this.getUserToken();
  }
}
