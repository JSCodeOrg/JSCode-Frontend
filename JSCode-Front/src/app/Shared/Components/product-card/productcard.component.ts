import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.scss']
})
export class ProductCardComponent {
  @Input() product: any; 

  constructor(private router: Router) {}

  navigateToDetail() {
    this.router.navigate(['/detail', this.product.id]);
  }
}