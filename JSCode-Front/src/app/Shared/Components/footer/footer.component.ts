import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
  animations: [
    trigger("fadeSlideUp", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(20px)" }),
        animate("0.3s ease-out", style({ opacity: 1, transform: "translateY(0)" }))
      ])
    ])
  ]
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  showCopied: boolean = false;

  ngOnInit(): void {}

  copyEmail(): void {
    navigator.clipboard.writeText("contact@store.com");
    this.showCopied = true;
    setTimeout(() => {
      this.showCopied = false;
    }, 2000);
  }
}
