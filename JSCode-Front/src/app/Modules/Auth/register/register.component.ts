import { ChangeDetectionStrategy, Component, input, Input } from "@angular/core";
import { ButtonComponent } from "../../../Shared/Components/button/button.component";
import { InputFieldComponent } from "../../../Shared/Components/input-field/input-field.component";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ButtonComponent, InputFieldComponent],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
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
    if (!this.registerData.name || !this.registerData.lastName || !this.registerData.user || !this.registerData.email || !this.registerData.password) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    else if(this.registerData.password !== this.passwordRepeat){
      alert("Las contraseñas no coinciden.");
      return;
    }
    console.log("Solicitud enviada:", JSON.stringify(this.registerData, null, 2));
  }
}
