import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAllBreadsComponent } from './list-all-breeds.component';

describe('ListAllBreadsComponent', () => {
  let component: ListAllBreadsComponent;
  let fixture: ComponentFixture<ListAllBreadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAllBreadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAllBreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
