import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { of, Subject } from 'rxjs';
import { Exhibition } from 'src/app/interfaces/exhibition';
import { VenueService } from 'src/app/services/venue.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

class MockVenueService {
  editedExibition$ = new Subject<Exhibition>();

  updateExhibitiom(id: string, exhibition: Exhibition) {
    return of(exhibition);
  }

  setEditExhibition(exhibition: Exhibition) {
    this.editedExibition$.next(exhibition);
  }
}

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let venueService: VenueService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: VenueService, useClass: MockVenueService },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    venueService = TestBed.inject(VenueService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ініціалізація форми та заповнення', () => {
    const exhibition: Exhibition = {
      id: '1',
      title: 'Test Exhibition',
      date: '2023-07-10',
      venue: 'Test Venue',
    };
    venueService.setEditExhibition(exhibition);

    expect(component.editVenueForm.value).toEqual({
      title: exhibition.title,
      date: exhibition.date,
      venue: exhibition.venue,
    });
  });

  it('перевірка надсилання форми та виконання змін', () => {
    const exhibition: Exhibition = {
      id: '1',
      title: 'Test Exhibition',
      date: '2023-07-10',
      venue: 'Test Venue',
    };
    venueService.setEditExhibition(exhibition);

    component.editVenueForm.setValue({
      title: 'Updated Title',
      date: '2023-07-11',
      venue: 'Updated Venue',
    });

    spyOn(venueService, 'updateExhibitiom').and.callThrough();

    component.onSubmit();

    expect(venueService.updateExhibitiom).toHaveBeenCalledWith('1', {
      id: '1',
      title: 'Updated Title',
      date: '2023-07-11',
      venue: 'Updated Venue',
    });

    expect(router.navigate).toHaveBeenCalledWith(['all']);
  });
});
