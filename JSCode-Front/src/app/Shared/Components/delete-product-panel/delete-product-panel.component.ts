
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from "../../../shared/components/button/button.component";

@Component({
  selector: 'app-delete-product-panel',
  templateUrl: './delete-product-panel.component.html',
    imports: [ButtonComponent]
})
export class DeleteProductPanelComponent {
  @Input() stock: number = 0;
  @Output() selectQuantity = new EventEmitter<void>();
  @Output() deleteStock = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  eliminar (event:Event){return}
  eliminarStock (event:Event){return}
  cancelar (event:Event){return}  

}
