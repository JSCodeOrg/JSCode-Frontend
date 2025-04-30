import { ChangeDetectionStrategy, Component, input, Output, EventEmitter} from "@angular/core";
import { ButtonComponent } from "../../../Shared/Components/button/button.component";
import { InputFieldComponent } from "../../../Shared/Components/input-field/input-field.component";
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-selector-rol",
  standalone: true,
  imports: [ButtonComponent, InputFieldComponent, MatSelectModule, CommonModule, FormsModule],
  templateUrl: "./selector-rol.component.html",
  styleUrls: ["./selector-rol.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRoleComponent {
  @Output() notify = new EventEmitter<{ type: string; message: string }>();
  loginData = {
    email: "",
    rol: "",
  };

  onEmailChange(value: string) {
    this.loginData.email = value;
  }
  onCreate() {
    if (!this.loginData.email || !this.loginData.rol) {
      this.notify.emit({ type: "danger", message: "Por favor, complete todos los campos." });
      return;
    }
    console.log("Solicitud enviada:", JSON.stringify(this.loginData, null, 2));
  }

  selectedValue: string = '';

  options = [
    { value: 'administrador', viewValue: 'Administrador' },
    { value: 'repartidor', viewValue: 'Repartidor' }
  ];
}
