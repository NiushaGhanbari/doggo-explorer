import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'result', component: SearchResultComponent },
  ];
  