import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiBreedService } from '../../core/services/api-breed.service';
import { SearchResultComponent } from './search-result.component';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let mockApiBreedService: jasmine.SpyObj<ApiBreedService>;
  let mockActivatedRoute: { queryParams: Observable<{ breed: string, subBreed?: string }> };

  beforeEach(() => {
    mockApiBreedService = jasmine.createSpyObj(['getImagesBySubBreed', 'getImagesByBreed']);
    mockActivatedRoute = {
      queryParams: of({ breed: 'testBreed', subBreed: 'testSubBreed' })
    };

    TestBed.configureTestingModule({
      imports: [ SearchResultComponent ],
      providers: [
        { provide: ApiBreedService, useValue: mockApiBreedService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getImagesBySubBreed if subBreed is present in queryParams', () => {
    mockApiBreedService.getImagesBySubBreed.and.returnValue(of(['image1', 'image2']));
    fixture.detectChanges();

    expect(mockApiBreedService.getImagesBySubBreed).toHaveBeenCalledWith('testBreed', 'testSubBreed');
    expect(component.images).toEqual(['image1', 'image2']);
  });

  it('should call getImagesByBreed if subBreed is not present in queryParams', () => {
    mockActivatedRoute.queryParams = of({ breed: 'testBreed' });
    mockApiBreedService.getImagesByBreed.and.returnValue(of(['image1', 'image2']));
    fixture.detectChanges();

    expect(mockApiBreedService.getImagesByBreed).toHaveBeenCalledWith('testBreed');
    expect(component.images).toEqual(['image1', 'image2']);
  });
});