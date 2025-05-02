import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from "../app/Modules/Auth/authcomponent/auth.component";
import { AdminRoleComponent } from "./Modules/Admin/SelectorRol/selector-rol.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JSCode-Front';
}
