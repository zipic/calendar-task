import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import { of } from 'rxjs';
import { VenueService } from 'src/app/services/venue.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

class MockVenueService {
  addExhibition(exhibition: any) {
    return of(exhibition);
  }
}

class MockRouter {
  navigate(path: string[]) {}
}

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let venueService: VenueService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: VenueService, useClass: MockVenueService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ініціалізація форма з пустими полями', () => {
    spyOn(venueService, 'addExhibition').and.callThrough();
    spyOn(router, 'navigate');

    const form = component.addVenueForm;
    form.get('title')?.setValue('Test title');
    form.get('date')?.setValue('2025-08-5');
    form.get('venue')?.setValue('Test venue');

    component.onSubmit();

    expect(venueService.addExhibition).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
