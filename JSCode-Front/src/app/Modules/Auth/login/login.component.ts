import { ChangeDetectionStrategy, Component, input, Output, EventEmitter } from "@angular/core";
import { ButtonComponent } from "../../../Shared/Components/button/button.component";
import { InputFieldComponent } from "../../../Shared/Components/input-field/input-field.component";
import { Router } from "@angular/router";
import { UserService } from "../../../services/UserServices/user.service";
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

  onLogin() {
    if (!this.loginData.mail || !this.loginData.password) {
      this.notify.emit({
        type: "danger",
        message: "Por favor, complete todos los campos.",
      });
      return;
    }
    this.userService.loginUser(this.loginData)
      .then((response) => {
        if(response.status == 200){
          this.notify.emit({
            type: "success",
            message: "Login exitoso.",
          });
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
