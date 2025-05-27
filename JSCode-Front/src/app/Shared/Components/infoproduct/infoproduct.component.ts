import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from "../input-field/input-field.component";

interface EditedProduct {
  product_name: string
  product_price: number
  product_description: string
  deleted_images: number[]
  added_images: string[]
}

interface Categoria{
  id: number
  nombreCategoria: string
}

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precioCompra: number;
  imagenes: Imagen[];
  categoria: Categoria;
}

interface Imagen {
  id: number
  url: string
}

@Component({
  selector: 'app-infoproduct',
  standalone: true,
  imports: [CommonModule, InputFieldComponent],
  templateUrl: './infoproduct.component.html',
  styleUrls: ['./infoproduct.component.scss']
})

export class InfoProductComponent implements OnInit {

  userRole: string = "";
  isEditable: boolean = false;

  editedProduct: EditedProduct = {
    product_name: "",
    product_price: 0,
    product_description: "",
    deleted_images:[] as number[] ,
    added_images: []
  }

  @Input() producto!: Producto;
  @Output() close = new EventEmitter<void>();
  selectedImage: string = '';
  showFullDescription = false;
  maxLength = 60;
  sizes: string[] = ['S', 'M', 'L', 'XL'];

  closeModal() {
    this.isEditable = false;
    this.close.emit();
  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }

  editInfoProduct() {
    this.isEditable = (!this.isEditable);
    console.log(this.isEditable);
  }

deleteImage(imageId: number): void {
  this.editedProduct.deleted_images.push(imageId);

  if (this.producto?.imagenes) {
    this.producto.imagenes = this.producto.imagenes.filter(img => img.id !== imageId);
  }


  if (this.selectedImage === this.producto?.imagenes?.find(img => img.id === imageId)?.url) {
    this.selectedImage = this.producto?.imagenes?.[0]?.url || '';
  }
}

  onProductNameChange() {


  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  checkAdmin() {
    const role = sessionStorage.getItem('userRole')
    if (!role) {
      console.error("Ocurrió un error al buscar el rol del usuario.")
    }
    else {
      this.userRole = role;
    }
    console.log(this.userRole)
  }
  ngOnInit(): void {
    this.checkAdmin();
    console.log(this.producto);
    console.log(this.isEditable)
  }
}