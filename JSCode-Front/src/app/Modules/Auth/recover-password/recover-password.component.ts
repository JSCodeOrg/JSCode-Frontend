import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recover-password',
  imports: [],
  templateUrl: './recover-password.component.html',
  styleUrls: ["./recover-password.component.scss"],
})
export class RecoverPasswordComponent {

  constructor(private router: Router){}

  goLogin(){
    this.router.navigate(['auth'])
  }

}
