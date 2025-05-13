// search-input.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';
import { debounce } from 'lodash-es';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'search-input',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchInputComponent {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  
  searchTerm = '';
  isLoading = false;
  faSearch = faSearch;
  faTimes = faTimes;

  private debouncedSearch = debounce(async (term: string) => {
    if (!term.trim()) {
      return;
    }

    this.isLoading = true;
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      this.isLoading = false;
    }
  }, 500);

  handleSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;
    this.debouncedSearch(value);
  }

  clearSearch() {
    this.searchTerm = '';
    this.searchInput.nativeElement.focus();
  }
}