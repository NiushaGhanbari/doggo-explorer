import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatTabsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: unknown
  ) {}

  public isFixedHeader: boolean = false;
  public headerOptions = [
    { label: 'List all breeds', route: 'list-all-breeds' },
    { label: 'Random image', route: 'random-image' },
    { label: 'By breed', route: 'by-breed' },
    { label: 'By sub-breed', route: 'by-sub-breed' },
    { label: 'Browse breed list', route: 'browse-breed-list' },
  ];
  navigateToHome() {
    this.router.navigate(['']);
  }

  onScrolling = () => {
    this.isFixedHeader = window.scrollY > 0 ? true : false;
  };

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
