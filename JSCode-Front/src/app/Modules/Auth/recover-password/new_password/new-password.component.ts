import { Component } from '@angular/core';
import { ButtonComponent } from "../../../../Shared/Components/button/button.component";
import { InputFieldComponent } from "../../../../Shared/Components/input-field/input-field.component";
import { Router } from '@angular/router';
import { UserService } from '../../../../services/UserServices/user.service';
import { PasswordRecoveryService } from '../../../../Shared/Services/PasswordRecoveryService';
@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ButtonComponent, InputFieldComponent],
  templateUrl: './new-password.component.html',
  styleUrls: ["./new-password.component.scss"],
})

export class NewPasswordComponent {
  newPasswordData = {
    newPassword: "",
    repeatPassword: ""
  };

  changePasswordRequest = {
    newPassword: "",
  };

  constructor(private router: Router, private userService: UserService) {

  }

  onNewPasswordChange(value: string) {
    this.newPasswordData.newPassword = value;
  }
  onRepeatPasswordChange(value: string) {
    this.newPasswordData.repeatPassword = value;
  }

  finalizarCambioContras() {
    if (!this.newPasswordData.newPassword || !this.newPasswordData.repeatPassword) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    if (this.newPasswordData.newPassword !== this.newPasswordData.repeatPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    this.changePasswordRequest.newPassword = this.newPasswordData.newPassword;

    this.userService.setNewPassword(this.changePasswordRequest).then((response =>{
      if(response.status == 200){
        console.log(response.data);
        alert("Contraseña cambiada exitosamente.");
        this.router.navigate(['auth'])
      }
      else{
        console.error("Error al cambiar la contraseña:", response.data);
        alert("Error al cambiar la contraseña.");
      }
    }))
  }
}