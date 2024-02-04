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

  it('should open dialog when button is clicked', () => {
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    mockDialogRef.afterClosed.and.returnValue(of('mockData'));
    mockDialog.open.and.returnValue(mockDialogRef);
  
    const button = fixture.debugElement.query(By.css('.open-dialog-button'));
    button.triggerEventHandler('click', null);
  
    expect(mockDialog.open).toHaveBeenCalled();
  });
});