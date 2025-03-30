import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
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
  @Input() hasIconStart: boolean = false;
  @Input() hasIconEnd: boolean = false;
  @Input() label: string = "Button";
  @Input() variant: "Primary" | "Neutral" | "Subtle" = "Primary";
  @Input() state: "Default" | "Hover" | "Disabled" = "Default";
  @Input() size: "Medium" | "Small" = "Medium";
  @Input() buttonType: 'primary' | 'secondary' = 'primary';
}
