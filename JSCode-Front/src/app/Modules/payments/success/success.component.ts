import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss'
})
export class SuccessComponent implements OnInit {
  orderId!: string;
  paymentId!: string;
  status!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
      this.paymentId = params['payment_id'];
      this.status = params['status'];
    })

    console.log("Order ID:", this.orderId);
    console.log("Payment ID:", this.paymentId);
    console.log("Status:", this.status);
  }
}
