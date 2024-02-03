import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BreedsList } from '../models/breed.types';

@Injectable({
  providedIn: 'root',
})
export class ApiBreadService {
  constructor(private httpClient: HttpClient) {}

  API = 'https://dog.ceo/api/breed';

  getImagesByBreed(breed: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.API}/${breed}/images`);
  }
  getImagesBySubBreed(breed: string, subBreed: string): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${this.API}/${breed}/${subBreed}/images`
    );
  }
}
