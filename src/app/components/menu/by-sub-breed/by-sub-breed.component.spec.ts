import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BySubBreedComponent } from './by-sub-breed.component';
import { of } from 'rxjs';
import { ApiBreedsService } from '../../../core/services/api-breeds.service';
import { ApiBreedService } from '../../../core/services/api-breed.service';

describe('BySubBreedComponent', () => {
  let component: BySubBreedComponent;
  let fixture: ComponentFixture<BySubBreedComponent>;
  let mockApiBreedsService: jasmine.SpyObj<ApiBreedsService>;
  let mockApiBreedService: jasmine.SpyObj<ApiBreedService>;

  beforeEach(() => {
    mockApiBreedsService = jasmine.createSpyObj(['getAllBreeds']);
    mockApiBreedService = jasmine.createSpyObj(['getImagesBySubBreed']);

    TestBed.configureTestingModule({
      imports: [ BySubBreedComponent ],
      providers: [
        { provide: ApiBreedsService, useValue: mockApiBreedsService },
        { provide: ApiBreedService, useValue: mockApiBreedService },
      ],
    });

    fixture = TestBed.createComponent(BySubBreedComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all breeds on init', () => {
    mockApiBreedsService.getAllBreeds.and.returnValue(of({ breed1: ['sub1', 'sub2'], breed2: [] }));
    component.ngOnInit();
    expect(component.breedsList).toEqual({ breed1: ['sub1', 'sub2'], breed2: [] });
    expect(component.breeds).toEqual(['breed1']);
  });

  it('should update selected breed', () => {
    component.breedsList = { breed1: ['sub1', 'sub2'], breed2: [] };
    component.updateSelectedBreed({ value: 'breed1' } as any);
    expect(component.selectedBreed).toBe('breed1');
    expect(component.subBreeds).toEqual(['sub1', 'sub2']);
  });

  it('should get sub breed images', () => {
    component.selectedBreed = 'breed1';
    mockApiBreedService.getImagesBySubBreed.and.returnValue(of(['image1', 'image2']));
    component.getSubBreedImages({ value: 'sub1' } as any);
    expect(component.images).toEqual(['image1', 'image2']);
  });
});