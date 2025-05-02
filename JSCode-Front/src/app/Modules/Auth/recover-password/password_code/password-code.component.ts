import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordRecoveryService } from '../../../../Shared/Services/PasswordRecoveryService';
import { ButtonComponent } from "../../../../Shared/Components/button/button.component";
import { UserService } from '../../../../services/UserServices/user.service';

@Component({
  selector: 'app-password-code',
  imports: [ButtonComponent],
  templateUrl: './password-code.component.html',
  styleUrls: ['./password-code.component.scss'],
})
//TODO: Implementar una alerta que diga que no se encontró correo al recargar la pagina
export class ValidateCodeComponent implements OnInit {
  recoverPasswordData = {
    mail: ""
  }

  validateData = {...this.recoverPasswordData, code: ""}

  @ViewChildren('codeInput') codeInputs!: QueryList<ElementRef>;

  constructor(private passwordRecoveryService: PasswordRecoveryService, private router: Router, private userService: UserService) { }

  validarCodigo(){
    const values = this.codeInputs.map(input => input.nativeElement.value);
    const code = values.join('');
    this.validateData.code = code;

    if(this.validateData.code === "" || this.validateData.code.length<6){
      //todo Cambiar por notifier
      alert("Por favor ingrese el código de verificación")
      return
    }

    this.userService.validateCode(this.validateData).then((response)=> {
      if(response.status == 200){
        this.router.navigate(['new-password'])
      }
      else{
        //todo Cambiar por notifier
        alert("El código de verificación es incorrecto")
      }
    })
  }

  goLogin(){
    this.router.navigate(['forgot-password'])
  }
  ngOnInit(): void {
    this.recoverPasswordData = this.passwordRecoveryService.getRecoverData();
    this.validateData.mail = this.recoverPasswordData.mail;
    if(!this.recoverPasswordData.mail){
      this.router.navigate(['forgot-password'])
    }
  }
}






