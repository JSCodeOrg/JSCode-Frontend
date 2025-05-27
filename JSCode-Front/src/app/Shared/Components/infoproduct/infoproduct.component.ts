import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from "../input-field/input-field.component";
import { ProductService } from '../../../core/services/products.service';

interface EditedProduct {
  id: number | null;
  nombre: string;
  descripcion: string;
  cantidadDisponible: number | null;
  stockMinimo: number | null;
  palabrasClave: string;
  precioCompra: number | null;
  imagenesEliminadas: Number[];
  imagenesAñadidas: File[];
}

interface Categoria {
  id: number
  nombreCategoria: string
}

interface Producto {
  id: number | null;
  nombre: string;
  descripcion: string;
  cantidadDisponible: number | null;
  stockMinimo: number | null;
  palabrasClave: string;
  precioCompra: number | null;
  urlsImagenes: Imagen[];
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

  @Input() producto_id!: number;
  @Output() close = new EventEmitter<void>();

  userRole: string = "";
  isEditable: boolean = false;

  previewUrls: string[] = []

  productData: Producto = {
    id: null,
    nombre: "",
    descripcion: "",
    cantidadDisponible: null,
    precioCompra: null,
    stockMinimo: null,
    urlsImagenes: [],
    palabrasClave: ""
  }

  editedProduct: EditedProduct = {
    id: 0,
    nombre: "",
    precioCompra: 0,
    descripcion: "",
    imagenesEliminadas: [] as number[],
    imagenesAñadidas: [],
    stockMinimo: 0,
    palabrasClave: "",
    cantidadDisponible: 0,
  }


  constructor(private productoService: ProductService) { }

  //TODO: Solicitar los productos, y modificar todo para que la información completa me quede aquí mismo.


  async getProductInfo(product_id: number) {
    const response = await this.productoService.getProductInfo(product_id);
    if (response.data) {
      this.productData = response.data.data
      console.log("Información nueva:", this.productData)
    }
  }

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

  setNewName(event: Event) {
    const input = event.target as HTMLInputElement
    const value = input.value
    this.editedProduct.nombre = value.trim();
  }

  setNewPrice(event: Event) {
    const input = event.target as HTMLInputElement
    const newPrice = Number(input.value)
    this.editedProduct.precioCompra = newPrice;
  }

  setNewDescription(event: Event) {
    const input = event.target as HTMLTextAreaElement
    const newDescription = input.value
    this.editedProduct.descripcion = newDescription
  }

  deleteImage(imageid: number) {
    this.editedProduct.imagenesEliminadas.push(imageid)
    this.productData.urlsImagenes = this.productData.urlsImagenes.filter(img => img.id !== imageid);
  }

  changeProductInfo() {
    if (this.productData.id) {
      this.editedProduct.id = this.productData.id
    }

    console.log(this.editedProduct);

  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (file) {
      this.editedProduct.imagenesAñadidas.push(file)
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrls.push(reader.result as string);
        console.log(this.previewUrls);
      }
      reader.readAsDataURL(file);
    }
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
    this.getProductInfo(this.producto_id)
    this.editedProduct.id = this.producto_id;
  }
}