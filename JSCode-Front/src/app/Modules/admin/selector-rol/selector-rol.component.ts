import { ChangeDetectionStrategy, Component, input, Output, EventEmitter} from "@angular/core";
import { ButtonComponent } from "../../../Shared/Components/button/button.component";
import { InputFieldComponent } from "../../../Shared/Components/input-field/input-field.component";
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AlertModule } from '@coreui/angular';
import { UserService } from "../../../core/services/user.service";

@Component({
  selector: "app-selector-rol",
  standalone: true,
  imports: [ButtonComponent, InputFieldComponent, MatSelectModule, CommonModule, FormsModule, AlertModule],
  templateUrl: "./selector-rol.component.html",
  styleUrls: ["./selector-rol.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminRoleComponent {
  alertMessage: string = '';
  alertType: string = '';
  showAlert: boolean = false;

  @Output() notify = new EventEmitter<{ type: string; message: string }>();
  RegisterRoleData = {
    email: "",
    role_id: "",
  };

  constructor(private userService: UserService) {
  }

  onEmailChange(value: string) {
    this.RegisterRoleData.email = value;
  }
  onCreateUserRole() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!this.RegisterRoleData.email || !this.RegisterRoleData.role_id) {
      this.onNotify({ type: "danger", message: "Por favor, complete todos los campos." });
      return;
    }
    else if (!emailRegex.test(this.RegisterRoleData.email)) {
      this.onNotify({ type: "danger", message: "El correo electrónico no es válido." });
      return;
    }
    else{
      this.userService.createUserRole(this.RegisterRoleData).then((response) => {
        if (response.status === 200) {
          this.onNotify({ type: "success", message: "Usuario con rol creado correctamente." });
        } else {
          this.onNotify({ type: "danger", message: "Error al crear el usuario." });
        }
      }).catch((error) => {
        console.error("Error al crear el rol:", error);
        this.onNotify({ type: "danger", message: "Error al crear el usuario." });
      }
      );
    }
  }

  options = [
    { value: '3', viewValue: 'Administrador' },
    { value: '2', viewValue: 'Repartidor' }
  ];

  onNotify(event: { type: string; message: string }) {
    this.alertType = event.type;
    this.alertMessage = event.message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
