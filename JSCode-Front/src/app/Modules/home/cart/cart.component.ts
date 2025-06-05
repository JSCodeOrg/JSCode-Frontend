import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ProductService } from '../../../core/services/products.service';
import { CommonModule } from '@angular/common';

interface ProductsOnCartInfo{
  nombre: string,
  cantidad: number,
  imageUrl: string
}

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  productsOnUserCart: ProductsOnCartInfo[] = [];

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
    this.productsOnUserCart = userCart.data.data.productos;
    console.log(this.productsOnUserCart)
  }


  ngOnInit(): void {
    this.getUserToken();
  }

}
