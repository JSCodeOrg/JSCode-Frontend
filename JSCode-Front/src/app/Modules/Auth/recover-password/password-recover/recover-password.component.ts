import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InputFieldComponent } from "../../../../shared/components/input-field/input-field.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { UserService } from '../../../../core/services/user.service';
import { PasswordRecoveryService } from '../../../../shared/state/PasswordRecoveryService';
import { AlertComponent } from "../../../../shared/components/alert/alert.component";
import { AlertService } from '../../../../shared/components/alert/alert.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-recover-password',
  imports: [InputFieldComponent, ButtonComponent, AlertComponent],
  templateUrl: './recover-password.component.html',
  styleUrls: ["./recover-password.component.scss"],
})
export class RecoverPasswordComponent {
  @Output() notify = new EventEmitter<{ type: string; message: string }>();
  recoverPasswordData = {
    mail: "",
  };

  private userMail = new BehaviorSubject<string>("");
  $setUserMail = this.userMail.asObservable();

  constructor(private router: Router, private userService: UserService, private passwordRecoveryService: PasswordRecoveryService, private alertService: AlertService) { }

  goLogin() {
    this.router.navigate(['auth'])
  }

  onEmailChange(value: string) {
    this.recoverPasswordData.mail = value;

  }
  enviarCorreoRecup() {
    if(!this.recoverPasswordData.mail){
      this.alertService.showAlert('danger', 'Por favor, complete el campo Email.');
      return;
    }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(this.recoverPasswordData.mail)) {
        this.alertService.showAlert('danger', 'Por favor, ingrese un correo electrónico válido.');
        return;
      }

    this.userMail.next(this.recoverPasswordData.mail);
    this.userService.recoverPassword(this.recoverPasswordData).then((response )=>{
      if(response.status == 200){
        console.log(response.data);
        this.passwordRecoveryService.setRecoverData(this.recoverPasswordData);
        this.router.navigate(['set-password'])
      }
      else{
        console.error("Error al enviar el correo de recuperación:", response.data);
      }
    })

  }
}
