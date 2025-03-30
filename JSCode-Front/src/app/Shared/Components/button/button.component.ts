import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
@Component({
  selector: "app-button",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() label: string = "Button";
  @Input() disabled: boolean = false;
  @Input() buttonType: 'primary' | 'secondary' = 'primary';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
