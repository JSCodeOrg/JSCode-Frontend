import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
@Component({
  selector: "app-input-field",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./input-field.component.html",
  styleUrls: ["./input-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent {
  @Input() label: string = ''; 
  @Input() type: string = 'text'; 
  @Input() placeholder: string = ''; 
  @Input() disabled: boolean = false;
}
