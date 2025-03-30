import { ChangeDetectionStrategy, Component, input, Output, EventEmitter } from "@angular/core";
import { ButtonComponent } from "../../../Shared/Components/button/button.component";
import { InputFieldComponent } from "../../../Shared/Components/input-field/input-field.component";
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
    email: "",
    password: "",
  };

  onEmailChange(value: string) {
    this.loginData.email = value;
  }

  onPasswordChange(value: string) {
    this.loginData.password = value;
  }

  onLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      this.notify.emit({ type: "danger", message: "Por favor, complete todos los campos." });
      return;
    }
    console.log("Solicitud enviada:", JSON.stringify(this.loginData, null, 2));
  }
}
