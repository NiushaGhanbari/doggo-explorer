import { Component, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { ApiBreedsService } from '../../../core/services/api-breeds.service';
import { Router } from '@angular/router';

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
  public allBreeds: any;

  ngOnInit(): void {
    this.getAllBreeds();
  }

  getAllBreeds() {
    this.apiBreedsService
      .getAllBreeds()
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((res) => {
        this.allBreeds = Object.entries(res).map(([breed, subbreed]) => ({
          breed,
          subbreed,
        }));
      });
  }

  navigate(breed: string, sub_breed: string) {
    const queryParams: { [key: string]: string } = {
      breed,
      sub_breed,
    };
    this.router.navigate(['/result'], { queryParams });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
