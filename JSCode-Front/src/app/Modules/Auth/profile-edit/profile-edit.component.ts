import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../Shared/Components/button/button.component'; 
import { InputFieldComponent } from '../../../Shared/Components/input-field/input-field.component'; 
import { UserService } from '../../../core/services/user.service';


@Component({
  selector: 'app-profile-edit',
  standalone: true,
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss'],
  imports: [ReactiveFormsModule, ButtonComponent, InputFieldComponent]
})
export class ProfileEditComponent implements OnInit {
  userData = {};

  @Output() close = new EventEmitter<void>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const userToken = sessionStorage.getItem('authToken');
    if (!userToken) {
      return;
    }

    //TODO: La información del usuario ya se está obteniendo, ahora solo debe mostrarse en el formulario.
    this.userService.getUserInfo(userToken).then((response) => {
      this.userData = response.data;
      console.log(this.userData);
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