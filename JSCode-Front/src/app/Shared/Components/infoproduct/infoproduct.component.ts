import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from "../input-field/input-field.component";
import { ProductService } from '../../../core/services/products.service';

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
  imagenesEliminadas: number[];
  imagenesAñadidas: File[];
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
    palabrasClave: "",
    imagenesEliminadas: [],
    imagenesAñadidas: []
  }

  constructor(private productoService: ProductService) { }

  //TODO: Solicitar los productos, y modificar todo para que la información completa me quede aquí mismo.


  async getProductInfo(product_id: number) {
    const response = await this.productoService.getProductInfo(product_id);
    if (response.data) {
      this.productData = {
        ...response.data.data,
        imagenesEliminadas: [],
        imagenesAñadidas: [],
        producto_id: this.producto_id
      }
    }

    console.log("la info es", this.productData.stockMinimo)
    console.log(typeof(this.productData.stockMinimo)) }

  async sendEditionRequest() {
    const userToken = sessionStorage.getItem('authToken');
    if (!userToken) return;

    const productoParaEnviar = {
      cantidadDisponible: this.productData.cantidadDisponible,
      descripcion: this.productData.descripcion,
      imagenesEliminadas: this.productData.imagenesEliminadas,
      nombre: this.productData.nombre,
      precioCompra: this.productData.precioCompra,
      stockMinimo: this.productData.stockMinimo,
      producto_id: this.producto_id,
      palabrasClave: this.productData.palabrasClave
    };

    const editProductRequest = await this.productoService.changeProductInfo(
      this.producto_id,
      userToken,
      {
        ...productoParaEnviar,
        imagenesAñadidas: this.productData.imagenesAñadidas
      }
    );

    if (editProductRequest.status === 200) {
      console.log(editProductRequest.data);
      if (editProductRequest.data) {
        this.productData = editProductRequest.data.data;
      }
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
    this.productData.nombre = value.trim();
  }

  setNewPrice(event: Event) {
    const input = event.target as HTMLInputElement
    const newPrice = Number(input.value)
    this.productData.precioCompra = newPrice;
  }

  setNewDescription(event: Event) {
    const input = event.target as HTMLTextAreaElement
    const newDescription = input.value
    this.productData.descripcion = newDescription
  }

  setNewMinimumStock(event: Event) {
    const input = event.target as HTMLInputElement;
    const newMinimumStock = input.value;
    this.productData.stockMinimo = Number(newMinimumStock)
  }

  setNewKeywords(event: Event) {
    const input = event.target as HTMLInputElement
    const newKeywords = input.value
    this.productData.palabrasClave = newKeywords

  }

  setNewQuantity(event: Event) {
    const input = event.target as HTMLInputElement
    const newQuantity = input.value
    this.productData.cantidadDisponible = Number(newQuantity)

  }

  deleteImage(imageid: number) {
    this.productData.imagenesEliminadas.push(imageid)
    this.productData.urlsImagenes = this.productData.urlsImagenes.filter(img => img.id !== imageid);
  }

  changeProductInfo() {
    this.sendEditionRequest();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (file) {
      this.productData.imagenesAñadidas.push(file)
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
  }
}