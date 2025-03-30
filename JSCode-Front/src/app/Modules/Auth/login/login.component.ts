import { ChangeDetectionStrategy, Component, input, Input } from "@angular/core";
import { ButtonComponent } from "../../../Shared/Components/button/button.component";
import { InputFieldComponent } from "../../../Shared/Components/input-field/input-field.component";
@Component({
  selector: "app-login",
  standalone: true,
  imports: [ButtonComponent, InputFieldComponent],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
