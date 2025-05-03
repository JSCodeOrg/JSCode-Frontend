import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordRecoveryService } from '../../../../shared/state/PasswordRecoveryService';
import { ButtonComponent } from "../../../../shared/components/button/button.component";
import { UserService } from '../../../../core/services/user.service';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { AlertService } from '../../../../shared/components/alert/alert.service';
import { BehaviorSubject } from 'rxjs';

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






