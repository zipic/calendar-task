import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { Exhibition } from 'src/app/interfaces/exhibition';
import { of } from 'rxjs';
import { VenueService } from 'src/app/services/venue.service';

class MockVenueService {
  exhibitions: Exhibition[] = [
    { id: '1', title: 'Exhibition 1', date: '2023-01-01', venue: 'Venue 1' },
    { id: '2', title: 'Exhibition 2', date: '2023-02-01', venue: 'Venue 2' },
  ];

  getExhibitons() {
    return of(this.exhibitions);
  }
}

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let venueService: VenueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [{ provide: VenueService, useClass: MockVenueService }],
    }).compileComponents();
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    venueService = TestBed.inject(VenueService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('заповнення календаря подіями', () => {
    const exhibitions = [
      { id: '1', title: 'Exhibition 1', date: '2023-01-01', venue: 'Venue 1' },
      { id: '2', title: 'Exhibition 2', date: '2023-02-01', venue: 'Venue 2' },
    ];
    spyOn(venueService, 'getExhibitons').and.returnValue(of(exhibitions));

    component.ngOnInit();

    expect(venueService.getExhibitons).toHaveBeenCalled();
    expect(component.calendarOptions.events).toEqual(exhibitions);
  });
});
