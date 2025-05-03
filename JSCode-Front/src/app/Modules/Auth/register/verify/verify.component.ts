import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify',
  imports: [CommonModule],
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  isVerified = false;
  errorMessage = '';
  successMessage = 'Tu cuenta fue activada exitosamente, puedes cerrar esta ventana.';
  
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.userService.verifyAccount(token).then((response) => {
        if (response.status === 200) {
          this.isVerified = true;
        } else {
          this.errorMessage = 'Hubo un error al verificar tu cuenta. Intenta nuevamente más tarde.';
        }
      }).catch((error) => {
        this.errorMessage = 'No se pudo contactar con el servidor. Intenta nuevamente más tarde.';
      });
    } else {
      this.errorMessage = 'No se proporcionó un token de verificación válido.';
    }
  }
}
