import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private messageSubject = new BehaviorSubject<string>('');
  private typeSubject = new BehaviorSubject<string>('success');
  private visibilitySubject = new BehaviorSubject<boolean>(false);

  alertMessage$ = this.messageSubject.asObservable();
  alertType$ = this.typeSubject.asObservable();
  showAlert$ = this.visibilitySubject.asObservable();

  showAlert(type: string, message: string, duration: number = 3000) {
    this.typeSubject.next(type);
    this.messageSubject.next(message);
    this.visibilitySubject.next(true);

    setTimeout(() => {
      this.visibilitySubject.next(false);
    }, duration);
  }
}
