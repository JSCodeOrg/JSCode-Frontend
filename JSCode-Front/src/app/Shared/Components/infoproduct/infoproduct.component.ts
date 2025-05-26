import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from "../input-field/input-field.component";

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

  editedProduct = {
    product_name: "",
    product_price: 0,
    product_description: "",
    deleted_images: [],
    added_images: []
  }

  @Input() id: any;
  @Output() close = new EventEmitter<void>();
  selectedImage: string = '';
  showFullDescription = false;
  maxLength = 60;
  sizes: string[] = ['S', 'M', 'L', 'XL'];

  closeModal() {
    this.close.emit();
  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }

  editInfoProduct() {
    this.isEditable = (!this.isEditable);

  }

  deleteImage(id: number){
    
  }

  onProductNameChange(){
    
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
    console.log(this.id);
  }
}