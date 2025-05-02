import { Component, ElementRef, EventEmitter, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordRecoveryService } from '../../../../Shared/Services/PasswordRecoveryService';
import { ButtonComponent } from "../../../../Shared/Components/button/button.component";
import { UserService } from '../../../../services/UserServices/user.service';
import { AlertComponent } from '../../../../Shared/Components/alert/alert.component';
import { AlertService } from '../../../../Shared/Components/alert/alert.service';

@Component({
  selector: 'app-password-code',
  imports: [ButtonComponent, AlertComponent],
  templateUrl: './password-code.component.html',
  styleUrls: ['./password-code.component.scss'],
})

export class ValidateCodeComponent implements OnInit {
  recoverPasswordData = {
    mail: ""
  }

  validateData = {...this.recoverPasswordData, code: ""}

  @ViewChildren('codeInput') codeInputs!: QueryList<ElementRef>;

  constructor(private passwordRecoveryService: PasswordRecoveryService, private router: Router, private userService: UserService, private alertService: AlertService) { }

  validarCodigo(){
    const values = this.codeInputs.map(input => input.nativeElement.value);
    const code = values.join('');
    this.validateData.code = code;

    if(this.validateData.code === "" || this.validateData.code.length<6){
      this.alertService.showAlert('danger', 'Por favor, Ingrese un código de verificación válido.');
      return
    }

    this.userService.validateCode(this.validateData).then((response)=> {
      if(response.status == 200){
        this.alertService.showAlert('success', 'Código validado correctamente.');
        this.router.navigate(['new-password'])
      }
      else{
        this.alertService.showAlert('danger', 'El código de verificación es incorrecto.');
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






