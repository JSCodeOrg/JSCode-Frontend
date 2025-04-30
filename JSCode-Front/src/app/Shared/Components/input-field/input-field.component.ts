import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, EventEmitter, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: "app-input-field",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: "./input-field.component.html",
  styleUrls: ["./input-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent {
  @Input() label: string = ''; 
  @Input() type: string = 'text'; 
  @Input() placeholder: string = ''; 
  @Input() icon: string = 'person';
  @Input() disabled: boolean = false;
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Output() valueChange = new EventEmitter<string>();

  inputControl = new FormControl('');

  constructor() {
    this.inputControl.valueChanges.subscribe(value => {
      if (value !== null) {
        this.valueChange.emit(value);
      }
    });
  }
}
