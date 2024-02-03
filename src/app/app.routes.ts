import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ListAllBreedsComponent } from './components/menu/list-all-breeds/list-all-breeds.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'result', component: SearchResultComponent },
    { path: 'list-all-breeds', component: ListAllBreedsComponent },
  ];
  