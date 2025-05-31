import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../../core/services/products.service';

interface ProductToCart {
  id_producto: number | null,
  cantidad: number | null
}

@Component({
  selector: 'app-quantity-modal',
  imports: [],
  templateUrl: './appquantitymodal.component.html',
  styleUrl: './appquantitymodal.component.scss'
})
export class AppquantitymodalComponent implements OnInit {
  @Input() productoId: number | null = null;
  @Output() cerrar = new EventEmitter<void>();

  product: ProductToCart = {
    id_producto: null,
    cantidad: null
  }

  constructor(private productService: ProductService) { }
  cancelar() {
    this.cerrar.emit();
  }

  async agregarAlCarrito() {
    console.log("Producto agregado", this.productoId)
    if (this.product.cantidad != null && this.product.cantidad > 0) {
      const token = sessionStorage.getItem('authToken')
      if (!token) {
        return
      }
      const response = await this.productService.addProductToCart(this.product, token)
      console.log(response.data)
    }

    this.cerrar.emit();
  }

  setQuantity(event: Event) {
    const input = event.target as HTMLInputElement;
    this.product.cantidad = Number(input.value);
  }

  ngOnInit(): void {
    this.product.id_producto = this.productoId;
  }

}
