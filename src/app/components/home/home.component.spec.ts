import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ApiBreedsService } from '../../core/services/api-breeds.service';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiBreedsService: ApiBreedsService;

  beforeEach(async () => {
    jasmine.getEnv().clearReporters();
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule, HomeComponent ],
      providers: [ 
        { provide: ApiBreedsService, useValue: jasmine.createSpyObj('ApiBreedsService', ['getRandomImage']) }
      ]
    })
    .compileComponents();

    apiBreedsService = TestBed.inject(ApiBreedsService);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call getRandomImage from ApiBreedsService and set randomImage', () => {
    const testImageUrl = 'test-image-url';
    spyOn(apiBreedsService, 'getRandomImage').and.returnValue(of(testImageUrl));
    component.getRandomImage();
    expect(apiBreedsService.getRandomImage).toHaveBeenCalled();
    expect(component.randomImage).toEqual(testImageUrl);
  });
});