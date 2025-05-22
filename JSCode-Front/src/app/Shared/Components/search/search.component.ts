// search-input.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'search-input',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchInputComponent {
  constructor(private router: Router) { }

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  searchTerm = '';
  isLoading = false;
  faSearch = faSearch;
  faTimes = faTimes;


  handleSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;
  }

  search(event: Event) {
    if (this.searchTerm != "") {
      this.router.navigate(['/search'], {
        queryParams: {
          q: this.searchTerm
        }
      })
      console.log(this.searchTerm)
    }
  }
  clearSearch() {
    this.searchTerm = '';
    this.searchInput.nativeElement.focus();
  }
}