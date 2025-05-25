import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-infoproduct',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infoproduct.component.html',
  styleUrls: ['./infoproduct.component.scss']
})
export class InfoProductComponent implements OnInit {
  @Input() id: any;
  @Output() close = new EventEmitter<void>();
  selectedImage: string = '';
  showFullDescription = false;
  maxLength = 60;

  sizes: string[] = ['S', 'M', 'L', 'XL'];

  closeModal() {
    this.close.emit();
  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }

  ngOnInit(): void {
    console.log(this.id)
  }
}