import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DogAutoSearchComponent } from '../../../shared/components/dog-auto-search/dog-auto-search.component';
import { ApiBreedsService } from '../../../core/services/api-breeds.service';
import { ApiBreedService } from '../../../core/services/api-breed.service';
import { Subject, take, takeUntil } from 'rxjs';
import { GalleryComponent } from '../../../shared/components/gallery/gallery.component';

@Component({
  selector: 'app-random-image',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    DogAutoSearchComponent,
    MatButtonModule,
    GalleryComponent,
  ],
  templateUrl: './random-image.component.html',
  styleUrl: './random-image.component.scss',
})
export class RandomImageComponent {
  public imageNumber = new FormControl(1, [
    Validators.min(1),
    Validators.max(50),
  ]);
  private selectedOption!: { breed: string; subBreed: string };
  public images: string[] = [];
  private destroy$ = new Subject();

  constructor(
    private apiBreedsService: ApiBreedsService,
    private apiBreedService: ApiBreedService
  ) {}

  onOptionSelected(option: { breed: string; subBreed: string }) {
    this.selectedOption = option;
  }

  getRandomImage(numberValue: number) {
    this.apiBreedsService
      .getMultipleRandomImage(numberValue)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res) => {
        this.images = res;
      });
  }

  getRandomImageByBreed(numberValue: number) {
    this.apiBreedService
      .getRandomImageByBreed(this.selectedOption.breed, numberValue)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res) => {
        this.images = res;
      });
  }
  getRandomImageBySubBreed(numberValue: number) {
    const { breed, subBreed } = this.selectedOption;
    this.apiBreedService
      .getRandomImageBySubBreed(breed, subBreed, numberValue)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res) => {
        this.images = res;
      });
  }

  fetchRandomImages() {
    const numberValue = this.imageNumber.value;
    if (!numberValue) return;
    if (this.selectedOption) {
      this.selectedOption.subBreed
        ? this.getRandomImageBySubBreed(numberValue)
        : this.getRandomImageByBreed(numberValue);
    } else {
      this.getRandomImage(numberValue);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
