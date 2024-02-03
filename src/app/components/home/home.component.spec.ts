import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiBreadsService } from '../../core/services/api-breads.service';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiBreadsService: ApiBreadsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent],
      providers: [
        {
          provide: ApiBreadsService,
          useValue: {
            getBreads: () => of([]),
          },
        },
      ],
    }).compileComponents();

    apiBreadsService = TestBed.inject(ApiBreadsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have injected the apiBreadsService', () => {
    expect(apiBreadsService).toBeTruthy();
  });
});