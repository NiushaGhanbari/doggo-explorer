import { Component, OnInit } from '@angular/core';
import { Observable, Subject, map, take, takeUntil } from 'rxjs';
import { ApiBreedsService } from '../../core/services/api-breeds.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Breed } from '../../core/models/breed.types';
import { Router } from '@angular/router';
import { transformToNewForma } from '../../shared/helpers';

@Component({
  standalone: true,
  selector: 'app-home',
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
  providers: [ApiBreedsService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private apiBreedsService: ApiBreedsService,
    private router: Router
  ) {}

  private destroy$ = new Subject();
  public myControl = new FormControl('');
  private allBreeds: Breed[] = [];
  public filteredOptions!: Observable<Breed[]>;
  public randomImage: string = '';

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map((value) => this.filter(value || ''))
    );
    this.getAllBreeds();
    this.getRandomImage();
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

  filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.allBreeds.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  getRandomImage() {
    this.apiBreedsService
      .getRandomImage()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res) => {
        this.randomImage = res;
      });
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const queryParams: { [key: string]: string } = {};
    const selectedValue = event.option.value;
    if (event.option.value.isBreed) {
      queryParams['breed'] = selectedValue.name;
    } else {
      queryParams['sub_breed'] = selectedValue.name;
      queryParams['breed'] = selectedValue.breed;
    }
    this.router.navigate(['/result'], { queryParams });
  }

  displayFn(option: Breed): string {
    return option ? option.name : '';
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
