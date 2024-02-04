import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiBreedService } from '../../core/services/api-breed.service';
import { Subject, take, takeUntil } from 'rxjs';
import { GalleryComponent } from '../../shared/components/gallery/gallery.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [GalleryComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiBreedService: ApiBreedService
  ) {}

  private destroy$ = new Subject();
  public images: string[] = [];

  ngOnInit(): void {
    this.route.queryParams
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((params) => {
        params['subBreed']
          ? this.getImagesBySubBreed(params['breed'], params['subBreed'])
          : this.getImagesByBreed(params['breed']);
      });
  }

  getImagesBySubBreed(breed: string, subBreed: string) {
    this.apiBreedService
      .getImagesBySubBreed(breed, subBreed)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res) => {
        this.images = res;
      });
  }

  getImagesByBreed(breed: string) {
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
