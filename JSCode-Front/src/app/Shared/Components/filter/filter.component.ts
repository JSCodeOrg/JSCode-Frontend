import { Component, OnInit, Output, EventEmitter, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { BehaviorSubject, debounceTime, map } from "rxjs";
import { trigger, transition, style, animate } from "@angular/animations";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: "filter-panel",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule],
  animations: [
    trigger("slideInOut", [
      transition(":enter", [
        style({ transform: "translateY(10%)", opacity: 0 }),
        animate("200ms ease-out", style({ transform: "translateY(0)", opacity: 1 }))
      ]),
      transition(":leave", [
        animate("200ms ease-in", style({ transform: "translateY(10%)", opacity: 0 }))
      ])
    ])
  ]
})
export class FilterPanelComponent implements OnInit {
  @Output() filterChange = new EventEmitter<any>();

  isFilterOpen = false;
  filterForm: FormGroup;
  brandSearch = new FormControl("");
  activeFiltersCount = 0;
  showBrandDropdown = false;
  showFilterError = false;

  private brandsSubject = new BehaviorSubject<any[]>([
    //logica para la sugestion
  ]);

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.filterForm = this.fb.group({
      minPrice: [0],
      maxPrice: [null], // Hacerlo requerido
      selectedColors: [[]],
      category: ['']
    });

    this.filterForm.get('maxPrice')?.setValidators([Validators.required, Validators.min(0), Validators.max(10000000)]);
  }

  ngOnInit() {
    // Inicializar con parámetros de la URL si existen
    this.route.queryParams.subscribe(params => {
      this.filterForm.patchValue({
        minPrice: params['minPrice'] ? +params['minPrice'] : 0,
        maxPrice: params['maxPrice'] ? +params['maxPrice'] : 1000,
        selectedColors: params['colors'] ? params['colors'].split(',') : [],
        selectedBrands: params['brands'] ? params['brands'].split(',') : []
      });
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.updateActiveFiltersCount();
      this.updateSliderTrack();
    });

    // Sincronización de sliders
    this.filterForm.get('minPrice')?.valueChanges.subscribe(value => {
      const maxPrice = this.filterForm.get('maxPrice')?.value;
      if (value > maxPrice) {
        this.filterForm.get('maxPrice')?.setValue(value, { emitEvent: false });
      }
      this.updateSliderTrack();
    });

    this.filterForm.get('maxPrice')?.valueChanges.subscribe(value => {
      const minPrice = this.filterForm.get('minPrice')?.value;
      if (value < minPrice) {
        this.filterForm.get('minPrice')?.setValue(value, { emitEvent: false });
      }
      this.updateSliderTrack();
    });
  }

  formatPriceInput(field: string) {
  const control = this.filterForm.get(field);
  if (control?.value) {
    const formatted = this.formatPrice(control.value);
    // Corrige esta línea:
    control.setValue(this.parsePrice(formatted), { emitEvent: true });
  }
}

  updateSliderTrack() {
  const min = this.filterForm.get('minPrice')?.value || 0;
  const max = this.filterForm.get('maxPrice')?.value || 10000000;
  const minPercent = (min / 10000000) * 100;
  const maxPercent = (max / 10000000) * 100;
  
  document.documentElement.style.setProperty('--min-percent', `${minPercent}%`);
  document.documentElement.style.setProperty('--max-percent', `${maxPercent}%`);
}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.combobox-container')) {
      this.showBrandDropdown = false;
    }
  }

  // Nueva función para formatear precios
  formatPrice(value: number): string {
    return value ? new Intl.NumberFormat('es-CO').format(value) : '';
  }

  // Nueva función para parsear precios
  parsePrice(value: string): number {
    return Number(value.replace(/\./g, ''));
  }

  // Actualiza las funciones de input
  onMinPriceInput(event: Event) {
    const value = this.parsePrice((event.target as HTMLInputElement).value);
    this.filterForm.get('minPrice')?.setValue(value);
  }

  onMaxPriceInput(event: Event) {
    const value = this.parsePrice((event.target as HTMLInputElement).value);
    this.filterForm.get('maxPrice')?.setValue(value);
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
    this.showFilterError = false;
  }

  isColorSelected(colorId: string): boolean {
    const selectedColors = this.filterForm.get("selectedColors")?.value || [];
    return selectedColors.includes(colorId);
  }

  toggleColor(colorId: string) {
    const selectedColors = [...(this.filterForm.get("selectedColors")?.value || [])];
    const index = selectedColors.indexOf(colorId);
    
    if (index === -1) {
      selectedColors.push(colorId);
    } else {
      selectedColors.splice(index, 1);
    }

    this.filterForm.patchValue({ selectedColors });
  }

  updateActiveFiltersCount() {
  const formValues = this.filterForm.value;
  this.activeFiltersCount = [
    formValues.minPrice > 0 ? true : null,
    formValues.maxPrice ? true : null,
    formValues.category ? true : null,
    ...(formValues.selectedColors || [])
  ].filter(Boolean).length;
}

hasActiveFilters(): boolean {
  const formValues = this.filterForm.value;
  return (
    formValues.minPrice > 0 ||
    !!formValues.maxPrice ||
    !!formValues.category ||
    (formValues.selectedColors && formValues.selectedColors.length > 0)
  );
}

resetFilters() {
  this.filterForm.patchValue({
    minPrice: 0,
    maxPrice: null,
    selectedColors: [],
    category: ''
  });
  }

  applyFilters() {
    if (!this.hasActiveFilters()) {
      this.showFilterError = true;
      this.snackBar.open('Debe aplicar al menos un filtro', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    const filters = this.filterForm.value;
    this.filterChange.emit(filters);
    this.toggleFilter();
    this.showBrandDropdown = false;
    this.showFilterError = false;
    
    // Redirigir a HomeSearchComponent con los parámetros de filtro
    this.router.navigate(['/busqueda'], {
      queryParams: this.createQueryParams(filters),
      queryParamsHandling: 'merge'
    });
  }

  private createQueryParams(filters: any): any {
    const params: any = {};
    
    // Precio
    if (filters.minPrice > 0) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.category) params.category = filters.category;
    
    // Colores
    if (filters.selectedColors?.length > 0) {
      params.colors = filters.selectedColors.join(',');
    }
    
    // Marcas
    if (filters.selectedBrands?.length > 0) {
      params.brands = filters.selectedBrands.join(',');
    }
    
    return params;
  }
}