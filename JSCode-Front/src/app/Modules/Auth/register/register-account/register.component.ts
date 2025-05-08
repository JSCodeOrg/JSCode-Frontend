import { ChangeDetectionStrategy, Component, input, Output, EventEmitter } from "@angular/core";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { InputFieldComponent } from "../../../../shared/components/input-field/input-field.component";
import { AlertModule } from '@coreui/angular';
import { CommonModule } from "@angular/common";
import { TooltipModule } from '@coreui/angular';
import { Router } from "@angular/router";
import { UserService } from "../../../../core/services/user.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ButtonComponent, InputFieldComponent, AlertModule, CommonModule, TooltipModule],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  @Output() notify = new EventEmitter<{ type: string; message: string }>();
  @Output() toggleToLogin = new EventEmitter<void>();
  passwordRepeat: string = "";
  registerData = {
    mail: "",
    password: "",
    document: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",

  };

  constructor(private router: Router, private userService: UserService) {
  }
  onNameChange(value: string) {
    this.registerData.nombre = value;
  }

  onGoToLogin() {
    this.toggleToLogin.emit();
  }

  onLastNameChange(value: string) {
    this.registerData.apellido = value;
  }

  onDocumentChange(value: string) {
    this.registerData.document = value;
  }

  onPhoneChange(value: string) {
    this.registerData.telefono = value;
  }

  onDirectionChange(value: string) {
    this.registerData.direccion = value;
  }

  onEmailChange(value: string) {
    this.registerData.mail = value;
  }
  onPasswordChange(value: string) {
    this.registerData.password = value;
  }
  onPasswordRepeatChange(value: string) {
    this.passwordRepeat = value;
  }

  isMobile() {
    return window.innerWidth <= 768;
  }



  onRegister() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;


    if (!this.registerData.nombre || !this.registerData.apellido || !this.registerData.mail || !this.registerData.password || !this.registerData.document || !this.registerData.direccion || !this.registerData.telefono) {
      this.notify.emit({ type: "danger", message: "Por favor, complete todos los campos." });
      return;
    }

    if (this.registerData.document.length < 7 || this.registerData.document.length > 10 || !/^\d+$/.test(this.registerData.document)) {
      this.notify.emit({
        type: "danger", message: "Por favor, ingrese un documento de identidad válido"
      })
      return
    }

    if (this.registerData.telefono.length < 10 || !/^\d+$/.test(this.registerData.telefono)) {
      this.notify.emit({
        type: "danger", message: "Por favor, ingresa un número de teléfono válido"
      })
      return
    }

    if (!emailRegex.test(this.registerData.mail)) {
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

   this.userService.registerUser(this.registerData)
  .then((response) => {
    if (response.status === 200) {
      this.notify.emit({ type: "success", message: "El registro fue exitoso" });
      setTimeout(() => {
        this.router.navigate(['auth']);
      }, 3000);
    } else {
      this.notify.emit({ type: "warning", message: response.data.message });
    }
  })
  .catch((error) => {
    if (error.response && error.response.status === 409) {
      this.notify.emit({ type: "danger", message: "El usuario o el documento ya existen." });
    } else if (error.response && error.response.status === 400) {
      this.notify.emit({ type: "danger", message: "Hay un error con los datos proporcionados." });
    } else {
      this.notify.emit({ type: "danger", message: "Ocurrió un error inesperado. Intente nuevamente más tarde." });
    }
    console.error("Error en la solicitud de registro:", error);
  });
  
}}
