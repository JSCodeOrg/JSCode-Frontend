import { ChangeDetectionStrategy, Component, input, Input } from "@angular/core";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./register/register.component";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../../Shared/Components/button/button.component";
@Component({
  selector: "app-auth",
  standalone: true,
  imports: [LoginComponent, RegisterComponent, CommonModule, ButtonComponent],
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  mostrarRegistro = false;

  toggleVista() {
    this.mostrarRegistro = !this.mostrarRegistro;
  }
}
