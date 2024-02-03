import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiBreedService } from '../../core/services/api-breed.service';
import { Subject, take, takeUntil } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss',
})
export class SearchResultComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private apiBreedService: ApiBreedService,
    public dialog: MatDialog
  ) {}

  private destroy$ = new Subject();
  public images: string[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      params['sub_breed']
        ? this.getImagesBySubBreed(params['breed'], params['sub_breed'])
        : this.getImagesByBreed(params['breed']);
    });
  }

  getImagesBySubBreed(breed: string, subbreed: string) {
    this.apiBreedService
      .getImagesBySubBreed(breed, subbreed)
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
        console.log(res, 'res');
        this.images = res;
      });
  }

  openImageModal(imageSrc: string): void {
    this.dialog.open(ImageModalComponent, {
      data: imageSrc,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

@Component({
  selector: 'image-dialog',
  templateUrl: 'image-dialog.html',
  standalone: true,
  imports: [MatDialogContent],
})
export class ImageModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
