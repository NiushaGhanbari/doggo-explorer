import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiBreedService {
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
  getRandomImageByBreed(
    breed: string,
    imageNumber: number
  ): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${this.API}/${breed}/images/random/${imageNumber}`
    );
  }
  getRandomImageBySubBreed(
    breed: string,
    subBreed: string,
    imageNumber: number
  ): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${this.API}/${breed}/${subBreed}/images/random/${imageNumber}`
    );
  }
}
