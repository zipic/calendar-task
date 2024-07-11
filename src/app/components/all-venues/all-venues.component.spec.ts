import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVenuesComponent } from './all-venues.component';
import { Exhibition } from 'src/app/interfaces/exhibition';
import { of } from 'rxjs';
import { VenueService } from 'src/app/services/venue.service';
import { Router } from '@angular/router';

class MockVenueService {
  exhibitions: Exhibition[] = [
    { id: '1', title: 'Exhibition 1', date: '2023-01-01', venue: 'Venue 1' },
    { id: '2', title: 'Exhibition 2', date: '2023-02-01', venue: 'Venue 2' },
  ];

  getExhibitons() {
    return of(this.exhibitions);
  }

  deleteExhibition(id: string) {
    this.exhibitions = this.exhibitions.filter(
      (exhibition) => exhibition.id !== id
    );
    return of(null);
  }

  setEditExhibition(exhibition: Exhibition) {}
}

class MockRouter {
  navigate(path: string[]) {}
}

describe('AllVenuesComponent', () => {
  let component: AllVenuesComponent;
  let fixture: ComponentFixture<AllVenuesComponent>;
  let venueService: VenueService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllVenuesComponent],
      providers: [
        { provide: VenueService, useClass: MockVenueService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AllVenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    venueService = TestBed.inject(VenueService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('чи спрацьовує OnIint', () => {
    component.ngOnInit();
    expect(component.exhibitions.length).toBe(2);
  });

  it('чи видаляється виставка', () => {
    spyOn(venueService, 'deleteExhibition').and.callThrough();
    component.deleteVenue('1');
    expect(venueService.deleteExhibition).toHaveBeenCalledWith('1');
    expect(component.exhibitions.length).toBe(1);
  });

  it('чи редагується виставка та спрацьовує перенаправленяя', () => {
    spyOn(venueService, 'setEditExhibition').and.callThrough();
    spyOn(router, 'navigate');
    const exhibition = {
      id: '1',
      title: 'Exhibition 1',
      date: '2023-01-01',
      venue: 'Venue 1',
    };
    component.editVenue(exhibition);
    expect(venueService.setEditExhibition).toHaveBeenCalledWith(exhibition);
    expect(router.navigate).toHaveBeenCalledWith(['edit']);
  });
});
