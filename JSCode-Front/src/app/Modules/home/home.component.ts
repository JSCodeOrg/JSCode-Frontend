import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../Shared/Components/header/header.component';
import { FooterComponent } from '../../Shared/Components/footer/footer.component';
import { ProfileEditComponent } from '../Auth/profile-edit/profile-edit.component';
import { CommonModule } from '@angular/common';
import { CarruselComponent } from '../../Shared/Components/carrusel/carrusel.component';
import { SearchInputComponent } from '../../Shared/Components/search/search.component';
import { FilterPanelComponent } from '../../Shared/Components/filter/filter.component';
import { InfoProductComponent } from '../../Shared/Components/infoproduct/infoproduct.component';
import { CartComponent } from "./cart/cart.component";
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsService } from '../../core/services/payments.service';


interface PaymentData{
    orderId: string,
    paymentId: string,
    status: string;
}
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
    InfoProductComponent,
    CartComponent
  ]
})


export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private paymentservice: PaymentsService) { }

  
  isCartOpen = false;

  hasBought = false;

  showProfileMenu = false;
  selectedProduct: any = null;

  onToggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  openProductModal(producto: any) {
    this.selectedProduct = producto;
  }

  closeProductModal() {
    this.selectedProduct = null;
  }

  onToggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const orderId = params.get('orderId');
      const status = params.get('status');
      const payment_id = params.get('payment_id');

      if (orderId && status && payment_id) {
        this.hasBought = true;

        const paymentData:PaymentData = {
          orderId: orderId,
          status: status,
          paymentId: payment_id
        }
        this.sendBoughtProductInformation(paymentData)
      }
    })
  }

  async sendBoughtProductInformation(datapayment: PaymentData) {
    await this.paymentservice.changeOrderStatus(datapayment)
  }

}