import { Component, OnInit, Output } from '@angular/core';
import { InputFieldComponent } from "../../../Shared/Components/input-field/input-field.component";
import { ButtonComponent } from "../../../Shared/Components/button/button.component";
import { Router } from "@angular/router";
import { UserService } from '../../../core/services/user.service';
import { AlertComponent } from "../../../Shared/Components/alert/alert.component";
import { EventEmitter } from '@angular/core';
import { AlertService } from '../../../Shared/Components/alert/alert.service';

@Component({
  selector: 'app-change-default-info',
  imports: [InputFieldComponent, ButtonComponent, AlertComponent],
  templateUrl: './change-default-info.component.html',
  styleUrl: './change-default-info.component.scss'
})
export class ChangeDefaultInfoComponent implements OnInit {
  @Output() notify = new EventEmitter<{ type: string; message: string }>();
  newPasswordData = {
    newPassword: "",
    repeatPassword: ""
  };

  isDelivery = false;

  dataToChange = {
    password: "",
    repeatPassword: "",
    document: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
  };

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) { }

  onNameChange(value: string) {
    this.dataToChange.nombre = value;
  }

  onLastNameChange(value: string) {
    this.dataToChange.apellido = value;
  }

  onDocumentChange(value: string) {
    this.dataToChange.document = value;
  }

  onPhoneChange(value: string) {
    this.dataToChange.telefono = value;
  }

  onDirectionChange(value: string) {
    this.dataToChange.direccion = value;
  }

  onPasswordChange(value: string) {
    this.dataToChange.password = value;
  }

  onPasswordRepeatChange(value: string) {
    this.dataToChange.repeatPassword = value;
  }

  finishUpdate() {

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!this.dataToChange.nombre || !this.dataToChange.apellido || !this.dataToChange.password || !this.dataToChange.document || !this.dataToChange.direccion || !this.dataToChange.telefono) {
      this.alertService.showAlert("danger", "Por favor, complete todos los campos.");
    }

    if (this.dataToChange.document.length < 7 || this.dataToChange.document.length > 10 || !/^\d+$/.test(this.dataToChange.document)) {
      this.alertService.showAlert("danger", "Por favor, ingresa un número de documento válido.");
      return
    }

    if (this.dataToChange.telefono.length < 10 || !/^\d+$/.test(this.dataToChange.telefono)) {
      this.alertService.showAlert("danger", "Por favor, ingresa un número de teléfono válido.");
      return
    }

    if (!passwordRegex.test(this.dataToChange.password)) {
      this.alertService.showAlert("danger", "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.");
      return;
    }

    if (this.dataToChange.password !== this.dataToChange.repeatPassword) {
      this.alertService.showAlert("danger", "Las contraseñas no coinciden.");
      return;
    }

    const token = sessionStorage.getItem('authToken')
    if (!token) {
      this.alertService.showAlert("danger", "No se ha encontrado un token válido en tu navegador, por favor reporta el error.")
      return;
    }

    if (this.isDelivery) {
      this.userService.updateDeliveryInformation(this.dataToChange, token).then((response) => {
        if (response.status == 200) {
          this.alertService.showAlert('success', 'Tu información fue actualizada con éxito! Serás redirigido a iniciar sesión')
          setTimeout(() => {
            sessionStorage.removeItem("authToken")
            sessionStorage.removeItem("rol");
            this.router.navigate(['login'])
          }, 4000)
        }
      })
      return;
    }

    this.userService.changeDefaultInfo(this.dataToChange, token).then((response) => {
      if (response.status == 200) {
        this.alertService.showAlert('success', 'Tu información fue actualizada con éxito! Serás redirigido a iniciar sesión')
        setTimeout(() => {
          sessionStorage.removeItem("authToken")
          this.router.navigate(['login'])
        }, 4000)
      }
    })
  }

  ngOnInit(): void {
    const token = sessionStorage.getItem('authToken');

    if (!token) {
      this.alertService.showAlert('danger', 'Ocurrió un error durante el inicio de sesión');
      setTimeout(() => {
        sessionStorage.removeItem("authToken")
        this.router.navigate(['login'])
      }, 4000)
      return;
    }

    this.validateDelivery(token);

  }

  async validateDelivery(authToken: string) {

    const userData = await this.userService.getUserData(authToken);

    console.log(userData.data);

    sessionStorage.setItem('rol', userData.data.data.role);

    if (userData.data.data.role === "repartidor") {
      this.isDelivery = true;
    }
  }
}
