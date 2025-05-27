import { Component } from '@angular/core';
import { HeaderComponent } from '../../Shared/Components/header/header.component'; 
import { FooterComponent } from '../../Shared/Components/footer/footer.component'; 
import { ProfileEditComponent } from '../Auth/profile-edit/profile-edit.component'; 
import { CommonModule } from '@angular/common';
import { CarruselComponent } from '../../Shared/Components/carrusel/carrusel.component'; 
import { SearchInputComponent } from '../../Shared/Components/search/search.component'; 
import { FilterPanelComponent } from '../../Shared/Components/filter/filter.component'; 
import { InfoProductComponent } from '../../Shared/Components/infoproduct/infoproduct.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
   imports: [
    HeaderComponent, 
    FooterComponent, 
    ProfileEditComponent, 
    CommonModule, 
    CarruselComponent, 
    SearchInputComponent, 
    FilterPanelComponent,
    InfoProductComponent]
})
export class HomeComponent {

  showProfileMenu = false;
  selectedProduct: any = null;

  onToggleProfileMenu(){
    this.showProfileMenu = !this.showProfileMenu;
  }

  openProductModal(producto: any) {
    this.selectedProduct = producto;
  }

  closeProductModal() {
    this.selectedProduct = null;
  }

}