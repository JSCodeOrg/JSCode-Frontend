import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { InputFieldComponent } from "../../../shared/components/input-field/input-field.component";
import { UserService } from '../../../core/services/user.service';

interface Userinfo{
  Fotoperfil: string
  nombre: string
  apellido: string
  documento: string
  direccion: string
  email: string
  telefono: string
}

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  imports: [ReactiveFormsModule, ButtonComponent, InputFieldComponent]
})
export class ProfileEditComponent implements OnInit {

  @Output() close = new EventEmitter<void>();

  constructor(private userService: UserService) { }

  userinfo: Userinfo = {Fotoperfil:"", nombre:"", apellido:"", documento:"", direccion:"", telefono:"", email:""}

  ngOnInit(): void {
    const userToken = sessionStorage.getItem('authToken');
    if (!userToken) {
      return;
    }

    //TODO: La información del usuario ya se está obteniendo, ahora solo debe mostrarse en el formulario.
    this.userService.getUserInfo(userToken).then((response) => {
      this.userinfo = response.data.data;
      console.log (this.userinfo)
    })

  }

  onClose() {
    this.close.emit();
  }

  onDocumentChange(value: string) {

  }

  onLastNameChange(value: string) { }

  onEmailChange(value: string) {

  }

  onPasswordChange(value: string) {

  }

  onChangePhoto() {

  }

  onPhoneChange(value: string) { }

  editInfo() {

  }

  onDeletePhoto() {
  }
}