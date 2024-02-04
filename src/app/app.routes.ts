import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ListAllBreedsComponent } from './components/menu/list-all-breeds/list-all-breeds.component';
import { RandomImageComponent } from './components/menu/random-image/random-image.component';
import { ByBreedComponent } from './components/menu/by-breed/by-breed.component';
import { BySubBreedComponent } from './components/menu/by-sub-breed/by-sub-breed.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'result', component: SearchResultComponent },
  { path: 'list-all-breeds', component: ListAllBreedsComponent },
  { path: 'random-image', component: RandomImageComponent },
  { path: 'by-breed', component: ByBreedComponent },
  { path: 'by-sub-breed', component: BySubBreedComponent },
];
