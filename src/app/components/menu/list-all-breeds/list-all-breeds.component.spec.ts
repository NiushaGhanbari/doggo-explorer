import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllBreedsComponent } from './list-all-breeds.component';

describe('ListAllBreedsComponent', () => {
  let component: ListAllBreedsComponent;
  let fixture: ComponentFixture<ListAllBreedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAllBreedsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAllBreedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
