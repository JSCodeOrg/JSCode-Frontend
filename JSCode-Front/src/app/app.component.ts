import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './Modules/Auth/login/login.component';
import { AuthComponent } from "./Modules/Auth/auth.component";

@Component({
  selector: 'app-root',
  imports: [AuthComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'JSCode-Front';
}
