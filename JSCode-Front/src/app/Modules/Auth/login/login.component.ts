import { ChangeDetectionStrategy, Component, input, Output, EventEmitter } from "@angular/core";
import { ButtonComponent } from "../../../Shared/Components/button/button.component";
import { InputFieldComponent } from "../../../Shared/Components/input-field/input-field.component";
import { Router } from "@angular/router";
import { UserService } from "../../../core/services/user.service";
import { response } from "express";
import { retry } from "rxjs";
@Component({
  selector: "app-login",
  standalone: true,
  imports: [ButtonComponent, InputFieldComponent],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @Output() notify = new EventEmitter<{ type: string; message: string }>();
  @Output() switchToRegister = new EventEmitter<void>();
  loginData = {
    mail: "",
    password: "",
  };

  constructor(private router: Router, private userService: UserService) { }

  onEmailChange(value: string) {
    this.loginData.mail = value.trim();
  }

  onPasswordChange(value: string) {
    this.loginData.password = value.trim();
  }

  callRegisterForm() {
    this.switchToRegister.emit();
  }

  onLogin() {
    if (!this.loginData.mail || !this.loginData.password) {
      this.notify.emit({
        type: "danger",
        message: "Por favor, complete todos los campos.",
      });
      return;
    }
    console.log("Correo enviado: [" + this.loginData.mail + "]");
    console.log("Longitud del correo:", this.loginData.mail.length);

    this.userService.loginUser(this.loginData)
      .then((response) => {
        if (response.status == 200) {
          sessionStorage.setItem("authToken", response.data.token);
          if (response.data.firstLogin) {
            this.router.navigate(['changedefaultinfo'])
          }
          else { this.router.navigate(['']) }
        }
      }).catch((error) => {
        if (error.status == 401) {
          this.notify.emit({
            type: "danger",
            message: "El usuario o la contraseña son incorrectos.",
          });
          console.log("cuerasdas")
          return;
        }
        if (error.status == 403) {
          this.notify.emit({
            type: "danger", message: "El usuario no está verificado, por favor verifique su correo electrónico."
          });
          return;
        } else {
          this.notify.emit({
            type: "danger", message: "Ocurrió un error inesperado. Intente nuevamente más tarde."
          });
        }
        return;
      });
  }

  onForgotPassword() {
    this.router.navigate(['forgot-password']);
  }
}
