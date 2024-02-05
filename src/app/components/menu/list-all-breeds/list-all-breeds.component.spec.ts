import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ApiBreedsService } from '../../../core/services/api-breeds.service';
import { ListAllBreedsComponent } from './list-all-breeds.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListAllBreedsComponent', () => {
    let component: ListAllBreedsComponent;
    let fixture: ComponentFixture<ListAllBreedsComponent>;
    let mockApiBreedsService: jasmine.SpyObj<ApiBreedsService>;
    let mockRouter: jasmine.SpyObj<Router>;
  
    beforeEach(() => {
      mockApiBreedsService = jasmine.createSpyObj('ApiBreedsService', ['getAllBreeds']);
      mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  
      TestBed.configureTestingModule({
        imports: [ListAllBreedsComponent],
        providers: [
          { provide: ApiBreedsService, useValue: mockApiBreedsService },
          { provide: Router, useValue: mockRouter },
        ],
        schemas: [NO_ERRORS_SCHEMA] // Add this line
      });
  
      fixture = TestBed.createComponent(ListAllBreedsComponent);
      component = fixture.componentInstance;
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllBreeds on init', () => {
    mockApiBreedsService.getAllBreeds.and.returnValue(of({}));
    component.ngOnInit();
    expect(mockApiBreedsService.getAllBreeds).toHaveBeenCalled();
  });

  it('should map breeds response correctly', () => {
    const response = { breed1: ['sub1', 'sub2'], breed2: ['sub3'] };
    const expected = [
      { breed: 'breed1', subBreed: ['sub1', 'sub2'] },
      { breed: 'breed2', subBreed: ['sub3'] },
    ];
    mockApiBreedsService.getAllBreeds.and.returnValue(of(response));
    component.ngOnInit();
    expect(component.allBreeds).toEqual(expected);
  });

  it('should navigate to result with breed and subBreed', () => {
    component.navigateToResult('breed1', 'sub1');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/result'], {
      queryParams: { breed: 'breed1', subBreed: 'sub1' },
    });
  });

  it('should navigate to result with breed only', () => {
    component.navigateToResult('breed1');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/result'], {
      queryParams: { breed: 'breed1' },
    });
  });
});