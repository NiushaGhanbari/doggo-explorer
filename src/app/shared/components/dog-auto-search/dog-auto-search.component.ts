import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Breed } from '../../../core/models/breed.types';
import { Observable, Subject, map, take, takeUntil } from 'rxjs';
import { ApiBreedsService } from '../../../core/services/api-breeds.service';
import { transformToNewForma } from '../../helpers';

@Component({
  selector: 'app-dog-auto-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './dog-auto-search.component.html',
  styleUrl: './dog-auto-search.component.scss',
})
export class DogAutoSearchComponent implements OnInit {
  @Output() optionSelected = new EventEmitter();
  public myControl = new FormControl('');
  private allBreeds: Breed[] = [];
  public filteredOptions!: Observable<Breed[]>;
  private destroy$ = new Subject();

  constructor(private apiBreedsService: ApiBreedsService) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map((value) => this.filter(value || ''))
    );
    this.getAllBreeds();
  }

  getAllBreeds() {
    this.apiBreedsService
      .getAllBreeds()
      .pipe(
        take(1),
        takeUntil(this.destroy$),
        map((response) => transformToNewForma(response))
      )
      .subscribe((res) => {
        this.allBreeds = res;
      });
  }

  filter(value: string | { name: string }): Breed[] {
    const filterValue =
      typeof value === 'string'
        ? value.toLowerCase()
        : value.name.toLowerCase();
    return this.allBreeds.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(option: Breed): string {
    return option ? option.name : '';
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const queryParams: { [key: string]: string } = {};
    const selectedValue = event.option.value;
    if (event.option.value.isBreed) {
      queryParams['breed'] = selectedValue.name;
    } else {
      queryParams['subBreed'] = selectedValue.name;
      queryParams['breed'] = selectedValue.breed;
    }
    this.optionSelected.emit(queryParams);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
