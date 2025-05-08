import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
})
export class ProfileEditComponent implements OnInit {
  profileForm!: FormGroup;
  photoPreview: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['Mario', Validators.required],
      lastName: ['Ocoró Pripra', Validators.required],
      email: ['negrito@hotmail.com', [Validators.required, Validators.email]],
      password: ['*', Validators.required]
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.value;
      console.log('Datos actualizados:', updatedData);
      // Aquí conectas con un servicio para guardar los datos
    }
  }

  onChangePhoto() {
    // Lógica para cargar nueva foto (input hidden + FileReader)
  }

  onDeletePhoto() {
    this.photoPreview = null;
  }
}