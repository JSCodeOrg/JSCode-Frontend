import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { InputFieldComponent } from "../../../shared/components/input-field/input-field.component";

@Component({
  selector: 'app-delete-quantity-panel',
  templateUrl: './delete-quantity-panel.component.html',
  styleUrls: ['./delete-quantity-panel.component.scss'],
  imports: [ButtonComponent, InputFieldComponent]
})
export class DeleteQuantityPanelComponent {
  @Input() stock: number = 0;
  cantidad: number = 0;

  confirmarCantidad() {
    console.log('Eliminar cantidad:', this.cantidad);
  }
  eliminar (event:Event){return}  
  obtenerCantidad (event:string){
    this.cantidad = parseInt(event);
  } 
}