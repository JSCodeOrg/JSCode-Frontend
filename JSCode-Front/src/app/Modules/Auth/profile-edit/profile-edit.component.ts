import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../Shared/Components/button/button.component';
import { InputFieldComponent } from '../../../Shared/Components/input-field/input-field.component';
import { UserService } from '../../../core/services/user.service';

//TODO: Actualmente la solicitud de cambio de datos se está enviando, sin embargo, es necesario, cuando el usuario registra datos que ya existen, (Email y Documento), El usuario debe recibir un
//Una notificación de que salió mal y porque.

interface UserData {
  nombre: string,
  apellido: string,
  direccion: string,
  email: string,
  telefono: string,
  fotoperfil: string,
  documento: string
}

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  imports: [ReactiveFormsModule, ButtonComponent, InputFieldComponent]
})
export class ProfileEditComponent implements OnInit {
  userData: UserData = {
    nombre: "",
    apellido: "",
    direccion: "",
    email: "",
    telefono: "",
    fotoperfil: "",
    documento: ""
  };

  newProfileImage: File | null = null

  

  @Output() close = new EventEmitter<void>();
  @Output() notify = new EventEmitter<{ type: string; message: string }>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userToken = sessionStorage.getItem('authToken');
    if (!userToken) {
      return;
    }

    this.userService.getUserInfo(userToken).then((response) => {
      console.log(response.data.data)
      this.userData = response.data.data
    })
  }

  onClose() {
    this.close.emit();
  }

  onDocumentChange(value: string) {
    const documentString = value.toString();
    this.userData.documento = documentString;
  }

  onNameChange(value: string) {
    this.userData.nombre = value;

  }

  onDirectionChange(value: string) {
    this.userData.direccion = value;
  }


  onLastNameChange(value: string) {
    this.userData.apellido = value;
  }

  onEmailChange(value: string) {
    this.userData.email = value;

  }

  onPasswordChange(value: string) {
    //TODO: Implementar el cambio de contraseña, al clickear en el botón, se debe redirigir directamente a una ventana para confirmar su anterior contraseña y escribir su nueva contraseña
  }

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.newProfileImage = file;

    const token = sessionStorage.getItem('authToken');
    if (!token) return;

    const response = await this.userService.changeProfileImage(file, token);

    this.userData.fotoperfil = response.data?.data.imageUrl;
  }



  onPhoneChange(value: string) {
    this.userData.telefono = value;
  }

  async editInfo() {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      return;
    }
    const response = await this.userService.changeUserData(token, this.userData);
    console.log(response.data)
    if (response.status == 409) {
      this.notify.emit({
        type: "warn",
        message: "El correo electrónico ya se encuentra en uso"
      })

    }

  }

  onDeletePhoto() {

  }
}