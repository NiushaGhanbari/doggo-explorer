import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let mockRouter: jasmine.SpyObj<Router>;
  
    beforeEach(async () => {
      mockRouter = jasmine.createSpyObj(['navigate']);
  
      await TestBed.configureTestingModule({})
      .overrideComponent(HeaderComponent, {
        set: {
          providers: [
            { provide: Router, useValue: mockRouter },
          ]
        }
      })
      .compileComponents();
  
      fixture = TestBed.createComponent(HeaderComponent);
      component = fixture.componentInstance;
    });
  
    it('should navigate to home when navigateToHome is called', () => {
      component.navigateToHome();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
    });
  
    it('should navigate to the given route when navigate is called', () => {
      const testRoute = 'test-route';
  
      component.navigate(testRoute);
  
      expect(mockRouter.navigate).toHaveBeenCalledWith([testRoute]);
    });
  });