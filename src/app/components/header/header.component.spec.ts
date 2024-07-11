import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { BehaviorSubject } from 'rxjs';
import { VenueService } from 'src/app/services/venue.service';

class MockVenueService {
  private menuOpenSubject = new BehaviorSubject<boolean>(false);
  menuOpen$ = this.menuOpenSubject.asObservable();

  isMenuOpen(value: boolean) {
    this.menuOpenSubject.next(value);
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let venueService: MockVenueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: VenueService, useClass: MockVenueService }],
    }).compileComponents();
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    venueService = TestBed.inject(VenueService) as unknown as MockVenueService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ініціалізація з закритим меню', () => {
    expect(component.isMenuOpen).toBe(false);
  });

  it('оновлення значення після отримання даних з сервісу', () => {
    venueService.isMenuOpen(true);
    fixture.detectChanges();
    expect(component.isMenuOpen).toBe(true);

    venueService.isMenuOpen(false);
    fixture.detectChanges();
    expect(component.isMenuOpen).toBe(false);
  });

  it('виклик меню з коректним булувим значенням', () => {
    spyOn(venueService, 'isMenuOpen').and.callThrough();

    component.openMenu();
    expect(venueService.isMenuOpen).toHaveBeenCalledWith(true);

    component.openMenu();
    expect(venueService.isMenuOpen).toHaveBeenCalledWith(false);
  });
});
