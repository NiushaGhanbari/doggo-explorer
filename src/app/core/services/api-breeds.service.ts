import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BreedsList } from '../models/breed.types';

@Injectable({
  providedIn: 'root',
})
export class ApiBreedsService {
  constructor(private httpClient: HttpClient) {}

  API = 'https://dog.ceo/api/breeds';

  getAllBreeds(): Observable<BreedsList> {
    return this.httpClient.get<BreedsList>(`${this.API}/list/all`);
  }
  getRandomImage(): Observable<string> {
    return this.httpClient.get<string>(`${this.API}/image/random`);
  }
}
