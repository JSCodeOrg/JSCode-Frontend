import { Component } from '@angular/core';
import { ButtonComponent } from "../../../shared/components/button/button.component";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  imports: [ButtonComponent]
})
export class ConfirmationDialogComponent {
  confirmar() {
    console.log('Acción confirmada');
  }

  cancelar() {
    console.log('Acción cancelada');
  }
  confirmarAccion (event:Event){return} 
  cancelarAccion (event:Event){return} 
}
