import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from "../register/register.component";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { AlertModule } from '@coreui/angular';

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [LoginComponent, RegisterComponent, CommonModule, ButtonComponent, AlertModule],
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  alertMessage: string = '';
  alertType: string = '';
  showAlert: boolean = false;

  mostrarRegistro = true;
  isRegisterVisibleOnMobile = true;

  constructor() {
    if (this.isMobile()) {
      this.isRegisterVisibleOnMobile = false;
    }
  }

  isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  toggleVista() {
      this.mostrarRegistro = !this.mostrarRegistro;
  }

  onNotify(event: { type: string; message: string }) {
    this.alertType = event.type;
    this.alertMessage = event.message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }
}
