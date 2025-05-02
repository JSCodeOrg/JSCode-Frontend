import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InputFieldComponent } from "../../../../Shared/Components/input-field/input-field.component";
import { ButtonComponent } from "../../../../Shared/Components/button/button.component";
import { UserService } from '../../../../services/UserServices/user.service';
import { PasswordRecoveryService } from '../../../../Shared/Services/PasswordRecoveryService';
@Component({
  selector: 'app-recover-password',
  imports: [InputFieldComponent, ButtonComponent],
  templateUrl: './recover-password.component.html',
  styleUrls: ["./recover-password.component.scss"],
})
export class RecoverPasswordComponent {
  recoverPasswordData = {
    mail: "",
  };

  constructor(private router: Router, private userService: UserService, private passwordRecoveryService: PasswordRecoveryService) { }

  goLogin() {
    this.router.navigate(['auth'])
  }

  onEmailChange(value: string) {
    this.recoverPasswordData.mail = value;

  }
  enviarCorreoRecup() {
    if(!this.recoverPasswordData.mail){
      console.log("Por favor, complete todos los campos.");
      return;
    }
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
