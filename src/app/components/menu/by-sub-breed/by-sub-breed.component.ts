import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { GalleryComponent } from '../../../shared/components/gallery/gallery.component';
import { ApiBreedsService } from '../../../core/services/api-breeds.service';
import { ApiBreedService } from '../../../core/services/api-breed.service';
import { Subject, take, takeUntil } from 'rxjs';
import { BreedsList } from '../../../core/models/breed.types';

@Component({
  selector: 'app-by-sub-breed',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, GalleryComponent],
  templateUrl: './by-sub-breed.component.html',
  styleUrl: './by-sub-breed.component.scss',
})
export class BySubBreedComponent {
  constructor(
    private apiBreedsService: ApiBreedsService,
    private apiBreedService: ApiBreedService
  ) {}

  private destroy$ = new Subject();
  public breedsList!: BreedsList;
  public breeds!: string[];
  public subBreeds!: string[];
  public selectedBreed!: string;
  public images: string[] = [];

  ngOnInit(): void {
    this.getAllBreeds();
  }
  getAllBreeds(): void {
    this.apiBreedsService
      .getAllBreeds()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res) => {
        this.breedsList = res;
        this.breeds = Object.keys(res).filter((key) => !!res[key].length);
      });
  }

  updateSelectedBreed(event: MatSelectChange) {
    this.selectedBreed = event.value;
    this.subBreeds = this.breedsList[this.selectedBreed];
  }

  getSubBreedImages(event: MatSelectChange): void {
    const subBreed = event.value;
    this.apiBreedService
      .getImagesBySubBreed(this.selectedBreed, subBreed)
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
