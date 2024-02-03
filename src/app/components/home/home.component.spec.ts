import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiBreedsService } from '../../core/services/api-breeds.service';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiBreedsService: ApiBreedsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent],
      providers: [
        {
          provide: ApiBreedsService,
          useValue: {
            getBreeds: () => of([]),
          },
        },
      ],
    }).compileComponents();

    apiBreedsService = TestBed.inject(ApiBreedsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have injected the apiBreedsService', () => {
    expect(apiBreedsService).toBeTruthy();
  });
});