import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GalleryComponent } from './gallery.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj(['open']);

    await TestBed.configureTestingModule({})
    .overrideComponent(GalleryComponent, {
      set: {
        providers: [
          { provide: MatDialog, useValue: mockDialog },
          { provide: MAT_DIALOG_DATA, useValue: {} },
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});