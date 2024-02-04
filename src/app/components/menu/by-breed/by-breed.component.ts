import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { ApiBreedsService } from '../../../core/services/api-breeds.service';
import { Subject, take, takeUntil } from 'rxjs';
import { GalleryComponent } from '../../../shared/components/gallery/gallery.component';
import { ApiBreedService } from '../../../core/services/api-breed.service';

@Component({
  selector: 'app-by-breed',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, GalleryComponent],
  templateUrl: './by-breed.component.html',
  styleUrl: './by-breed.component.scss'
})
export class ByBreedComponent implements OnInit, OnDestroy {
  constructor(
    private apiBreedsService: ApiBreedsService,
    private apiBreedService: ApiBreedService
  ) {}

  private destroy$ = new Subject();
  public breeds!: string[];
  public images: string[] = [];

  ngOnInit(): void {
    this.getAllBreeds();
  }
  getAllBreeds(): void {
    this.apiBreedsService
      .getAllBreeds()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res) => {
        this.breeds = Object.keys(res);
      });
  }

  getBreedImages(event: MatSelectChange): void {
    const breed = event.value;
    this.apiBreedService
    .getImagesByBreed(breed)
    .pipe(take(1), takeUntil(this.destroy$))
    .subscribe((res) => {
      this.images = res;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
