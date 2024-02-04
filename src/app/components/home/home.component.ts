import { Component, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { ApiBreedsService } from '../../core/services/api-breeds.service';
import { DogAutoSearchComponent } from '../../shared/components/dog-auto-search/dog-auto-search.component';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [DogAutoSearchComponent],
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
  public randomImage: string = '';

  ngOnInit(): void {
    this.getRandomImage();
  }

  getRandomImage() {
    this.apiBreedsService
      .getRandomImage()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res) => {
        this.randomImage = res;
      });
  }

  navigateToResult(queryParams: { [key: string]: string }) {
    this.router.navigate(['/result'], { queryParams });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
