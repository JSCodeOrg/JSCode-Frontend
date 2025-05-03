import { ChangeDetectionStrategy, Component, input, Output, EventEmitter } from "@angular/core";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { InputFieldComponent } from "../../../shared/components/input-field/input-field.component";
import { Router } from "@angular/router";
import { UserService } from "../../../core/services/user.service";
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
    this.loginData.mail = value;
  }

  onPasswordChange(value: string) {
    this.loginData.password = value;
  }

  callRegisterForm(){
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

    //TODO: Falta validar si ocurre un error de conexión con el servidor.
    this.userService.loginUser(this.loginData)
      .then((response) => {
        if(response.status == 200){
          sessionStorage.setItem("authToken", response.data.token);

          this.router.navigate([''])
        }
      })
      .catch((error) => {
        console.error("Error al hacer login:", error);
        this.notify.emit({
          type: "danger",
          message: "Correo o contraseña incorrectos.",
        });
      });
  }



  onForgotPassword() {
    this.router.navigate(['forgot-password']);
  }
}
