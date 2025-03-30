import { ChangeDetectionStrategy, Component, input, Output, EventEmitter } from "@angular/core";
import { ButtonComponent } from "../../../Shared/Components/button/button.component";
import { InputFieldComponent } from "../../../Shared/Components/input-field/input-field.component";
import { AlertModule } from '@coreui/angular';
import { CommonModule } from "@angular/common";
import { TooltipModule } from '@coreui/angular';

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ButtonComponent, InputFieldComponent, AlertModule, CommonModule , TooltipModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  @Output() notify = new EventEmitter<{ type: string; message: string }>();
  passwordRepeat: string = "";
  registerData = {
    name: "",
    lastName: "",
    user:"",
    email: "",
    password: "",
  };
  onNameChange(value: string) {
    this.registerData.name = value;
  }
  onLastNameChange(value: string) {
    this.registerData.lastName = value;
  }
  onUserChange(value: string) {
    this.registerData.user = value;
  }
  onEmailChange(value: string) {
    this.registerData.email = value;
  }
  onPasswordChange(value: string) {
    this.registerData.password = value;
  }
  onPasswordRepeatChange(value: string) {
    this.passwordRepeat = value;
  }

  onRegister() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!this.registerData.name || !this.registerData.lastName || !this.registerData.user || !this.registerData.email || !this.registerData.password) {
      this.notify.emit({ type: "danger", message: "Por favor, complete todos los campos." });
      return;
    }

    if (!emailRegex.test(this.registerData.email)) {
      this.notify.emit({ type: "danger", message: "Ingrese un correo válido." });
      return;
    }

    if (!passwordRegex.test(this.registerData.password)) {
      this.notify.emit({ 
        type: "danger", 
        message: "Contraseña inválida. Debe cumplir con los requisitos minimos"
      });
      return;
    }

    if (this.registerData.password !== this.passwordRepeat) {
      this.notify.emit({ type: "warning", message: "Las contraseñas no coinciden." });
      return;
    }

    this.notify.emit({ type: "success", message: "Registro exitoso." });
    console.log("Solicitud enviada:", JSON.stringify(this.registerData, null, 2));
  }
}
