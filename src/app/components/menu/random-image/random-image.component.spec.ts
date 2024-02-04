import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { RandomImageComponent } from './random-image.component';
import { ApiBreedService } from '../../../core/services/api-breed.service';
import { ApiBreedsService } from '../../../core/services/api-breeds.service';

describe('RandomImageComponent', () => {
  let component: RandomImageComponent;
  let fixture: ComponentFixture<RandomImageComponent>;
  let mockApiBreedsService: jasmine.SpyObj<ApiBreedsService>;
  let mockApiBreedService: jasmine.SpyObj<ApiBreedService>;

  beforeEach(() => {
    mockApiBreedsService = jasmine.createSpyObj(['getMultipleRandomImage']);
    mockApiBreedService = jasmine.createSpyObj(['getRandomImageByBreed', 'getRandomImageBySubBreed']);

    TestBed.configureTestingModule({
      imports: [RandomImageComponent],
      providers: [
        { provide: ApiBreedsService, useValue: mockApiBreedsService },
        { provide: ApiBreedService, useValue: mockApiBreedService },
      ],
    });

    fixture = TestBed.createComponent(RandomImageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMultipleRandomImage and set images on getRandomImage call', () => {
    const images = ['image1', 'image2'];
    mockApiBreedsService.getMultipleRandomImage.and.returnValue(of(images));
    component.getRandomImage(2);
    expect(component.images).toEqual(images);
  });

  it('should call appropriate method based on selectedOption in fetchRandomImages', () => {
    const images = ['image1', 'image2'];
    const option = { breed: 'test', subBreed: 'test' };
    component.onOptionSelected(option);
    mockApiBreedService.getRandomImageBySubBreed.and.returnValue(of(images));
    component.fetchRandomImages();
    expect(component.images).toEqual(images);
  });
});