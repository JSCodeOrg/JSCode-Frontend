import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { trigger, state, style, animate, transition } from "@angular/animations";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse, faBox, faPhone, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Router } from "@angular/router";
import { UserService } from "../../../services/UserServices/user.service";


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  animations: [
    trigger("authState", [
      state("authenticated", style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      state("unauthenticated", style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      transition("* => *", [
        animate("0.3s ease-in-out")
      ])
    ]),
    trigger("dropdownAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-10px)" }),
        animate("200ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))
      ]),
      transition(":leave", [
        animate("200ms ease-in", style({ opacity: 0, transform: "translateY(-10px)" }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  isMobileMenuOpen = false;
  isProfileMenuOpen = false;
  activeLink = "home";
  favoritesCount = 0;
  cartCount = 0;
  userProfileImage = "";

  faHouse = faHouse;
  faBox = faBox;
  faPhone = faPhone;
  faCircleInfo = faCircleInfo;

  constructor(private router: Router, private userService: UserService) {} 

  ngOnInit(): void {
    this.userService.getUserData(sessionStorage.getItem('authToken') || '').then((response) => {
      if(response.status == 200){
        this.isAuthenticated = true;
        this.userProfileImage =  response.data.data.profileImgUrl;
      }
    });

  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  closeProfileMenu(): void {
    this.isProfileMenuOpen = false;
  }

  signIn(): void {
    this.router.navigate(['auth'])
  }

  signOut(): void {
    this.isAuthenticated = false;
    this.closeProfileMenu();
  }

  register(): void {
    this.router.navigate(['/login']);
  }

  toggleFavorites(): void {
    // Implement favorites toggle logic
  }

  toggleCart(): void {
    // Implement cart toggle logic
  }
}


