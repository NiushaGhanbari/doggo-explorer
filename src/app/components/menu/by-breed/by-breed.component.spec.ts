import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ByBreedComponent } from './by-breed.component';
import { of } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { ApiBreedsService } from '../../../core/services/api-breeds.service';
import { ApiBreedService } from '../../../core/services/api-breed.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ByBreedComponent', () => {
  let component: ByBreedComponent;
  let fixture: ComponentFixture<ByBreedComponent>;
  let mockApiBreedsService = { getAllBreeds: jasmine.createSpy('getAllBreeds') };
  let mockApiBreedService = { getImagesByBreed: jasmine.createSpy('getImagesByBreed') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [
        { provide: ApiBreedsService, useValue: mockApiBreedsService },
        { provide: ApiBreedService, useValue: mockApiBreedService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ByBreedComponent);
    component = fixture.componentInstance;
    mockApiBreedsService.getAllBreeds.and.returnValue(of({ breed1: [], breed2: [] }));
    mockApiBreedService.getImagesByBreed.and.returnValue(of(['image1', 'image2']));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllBreeds on init', () => {
    expect(mockApiBreedsService.getAllBreeds).toHaveBeenCalled();
  });

  it('should set breeds on getAllBreeds call', () => {
    component.getAllBreeds();
    expect(component.breeds).toEqual(['breed1', 'breed2']);
  });

  it('should call getImagesByBreed on getBreedImages call', () => {
    const mockEvent = { value: 'breed1' } as MatSelectChange;
    component.getBreedImages(mockEvent);
    expect(mockApiBreedService.getImagesByBreed).toHaveBeenCalledWith('breed1');
  });

  it('should set images on getBreedImages call', () => {
    const mockEvent = { value: 'breed1' } as MatSelectChange;
    component.getBreedImages(mockEvent);
    expect(component.images).toEqual(['image1', 'image2']);
  });
});