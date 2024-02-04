import { Component, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ApiBreedsService } from '../../../core/services/api-breeds.service';
import { Router } from '@angular/router';
import { BreedsList } from '../../../core/models/breed.types';

@Component({
  selector: 'app-list-all-breeds',
  standalone: true,
  imports: [MatButtonModule, MatExpansionModule],
  templateUrl: './list-all-breeds.component.html',
  styleUrl: './list-all-breeds.component.scss',
})
export class ListAllBreedsComponent implements OnInit {
  constructor(
    private apiBreedsService: ApiBreedsService,
    private router: Router
  ) {}

  private destroy$ = new Subject();
  public allBreeds!: { breed: string; subBreed: any }[];

  ngOnInit(): void {
    this.getAllBreeds();
  }

  getAllBreeds(): void {
    this.apiBreedsService
      .getAllBreeds()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res) => this.mapBreedsResponse(res));
  }

  private mapBreedsResponse(response: BreedsList): void {
    this.allBreeds = Object.entries(response).map(([breed, subBreed]) => ({
      breed,
      subBreed,
    }));
  }

  navigateToResult(breed: string, subBreed?: string): void {
    const queryParams: Record<string, string> = {
      breed,
      ...(subBreed && { subBreed }),
    };
    this.router.navigate(['/result'], { queryParams });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
