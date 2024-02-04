import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogAutoSearchComponent } from './dog-auto-search.component';

describe('DogAutoSearchComponent', () => {
  let component: DogAutoSearchComponent;
  let fixture: ComponentFixture<DogAutoSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DogAutoSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DogAutoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
