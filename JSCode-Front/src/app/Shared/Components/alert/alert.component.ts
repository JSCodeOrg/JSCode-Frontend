import { Component, OnInit } from '@angular/core';
import { AlertService } from './alert.service';
import { AlertModule } from '@coreui/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  imports: [AlertModule, CommonModule],
})
export class AlertComponent implements OnInit {
  message: string = '';
  type: string = 'success';
  visible: boolean = false;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.alertMessage$.subscribe(msg => this.message = msg);
    this.alertService.alertType$.subscribe(type => this.type = type);
    this.alertService.showAlert$.subscribe(show => this.visible = show);
  }
}
