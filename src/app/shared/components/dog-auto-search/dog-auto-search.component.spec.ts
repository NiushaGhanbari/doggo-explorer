import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DogAutoSearchComponent } from './dog-auto-search.component';
import { ApiBreedsService } from '../../../core/services/api-breeds.service';
import { of } from 'rxjs';
import { Breed } from '../../../core/models/breed.types';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DogAutoSearchComponent', () => {
  let component: DogAutoSearchComponent;
  let fixture: ComponentFixture<DogAutoSearchComponent>;
  let apiBreedsService: ApiBreedsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ApiBreedsService, useValue: jasmine.createSpyObj('ApiBreedsService', ['getAllBreeds']) },
      ],
      imports: [DogAutoSearchComponent, FormsModule, ReactiveFormsModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogAutoSearchComponent);
    component = fixture.componentInstance;
    apiBreedsService = TestBed.inject(ApiBreedsService);
    (apiBreedsService.getAllBreeds as jasmine.Spy).and.returnValue(of([])); // Ensure getAllBreeds returns an Observable
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAllBreeds on init', () => {
    const breeds: Breed[] = [{ name: 'breed1', breed: 'breed1', isBreed: true }, { name: 'breed2', breed: 'breed2', isBreed: false }];
    (apiBreedsService.getAllBreeds as jasmine.Spy).and.returnValue(of(breeds));
    component.ngOnInit();
    expect(apiBreedsService.getAllBreeds).toHaveBeenCalled();
  });

  it('should filter options based on input value', () => {
    const breeds: Breed[] = [{ name: 'breed1', breed: 'breed1', isBreed: true }, { name: 'breed2', breed: 'breed2', isBreed: false }];
    (apiBreedsService.getAllBreeds as jasmine.Spy).and.returnValue(of(breeds));
    component.ngOnInit();
    const filteredBreeds = component.filter('breed1');
    expect(filteredBreeds.length).toBe(1);
    expect(filteredBreeds[0].name).toBe('breed1');
  });
});