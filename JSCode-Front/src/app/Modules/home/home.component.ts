import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ProductCardComponent } from '../../shared/components/product-card/productcard.component';
import { ProfileEditComponent } from "../auth/profile-edit/profile-edit.component";
import { CommonModule } from '@angular/common';
import { CarruselComponent } from "../../shared/components/carrusel/carrusel.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [HeaderComponent, FooterComponent, ProfileEditComponent, CommonModule, CarruselComponent],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  showProfileMenu = false;

  onToggleProfileMenu(){
    this.showProfileMenu = !this.showProfileMenu;
  }

}