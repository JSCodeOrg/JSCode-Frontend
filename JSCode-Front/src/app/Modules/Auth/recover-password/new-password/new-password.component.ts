import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { InputFieldComponent } from "../../../../shared/components/input-field/input-field.component";
import { Router } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { AlertService } from '../../../../shared/components/alert/alert.service';
@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ButtonComponent, InputFieldComponent, AlertComponent],
  templateUrl: './new-password.component.html',
  styleUrls: ["./new-password.component.scss"],
})

export class NewPasswordComponent {
  @Output() notify = new EventEmitter<{ type: string; message: string }>();
  newPasswordData = {
    newPassword: "",
    repeatPassword: ""
  };

  changePasswordRequest = {
    newPassword: "",
  };

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) {

  }

  onNewPasswordChange(value: string) {
    this.newPasswordData.newPassword = value;
  }
  onRepeatPasswordChange(value: string) {
    this.newPasswordData.repeatPassword = value;
  }

  finalizarCambioContras() {
    if (!this.newPasswordData.newPassword || !this.newPasswordData.repeatPassword) {
      this.alertService.showAlert("danger", "Por favor, complete todos los campos.");
    }
    if (this.newPasswordData.newPassword !== this.newPasswordData.repeatPassword) {
      this.alertService.showAlert('danger', 'Las contraseñas no coinciden.');
      return;
    }
    this.changePasswordRequest.newPassword = this.newPasswordData.newPassword;

    this.userService.setNewPassword(this.changePasswordRequest).then((response =>{
      if(response.status == 200){
        console.log(response.data);
        this.alertService.showAlert('success', 'Contraseña cambiada correctamente.');
        setTimeout(() => {
          this.router.navigate(['auth']);
        }, 3000);
      }
      else{
        console.error("Error al cambiar la contraseña:", response.data);
        this.alertService.showAlert('danger', 'Ocurrió un error al cambiar la contraseña.');
      }
    }))
  }
}