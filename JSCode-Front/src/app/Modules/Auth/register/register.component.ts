import { ChangeDetectionStrategy, Component, input, Input } from "@angular/core";
import { ButtonComponent } from "../../../Shared/Components/button/button.component";
import { InputFieldComponent } from "../../../Shared/Components/input-field/input-field.component";
@Component({
  selector: "app-register",
  standalone: true,
  imports: [ButtonComponent, InputFieldComponent],
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {}
