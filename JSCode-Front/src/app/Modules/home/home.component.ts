import { Component } from '@angular/core';
import { HeaderComponent } from '../../Shared/Components/header/header.component';
import { FooterComponent } from '../../Shared/Components/footer/footer.component';
import { ProductCardComponent } from '../../Shared/Components/product-card/productcard.component';
import { SearchInputComponent } from '../../Shared/Components/search/search.component';
import { FilterPanelComponent } from '../../Shared/Components/filter/filter.component';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [HeaderComponent, FooterComponent, ProductCardComponent, SearchInputComponent, FilterPanelComponent],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}

