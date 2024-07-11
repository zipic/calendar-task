import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { VenueService } from './venue.service';
import { Exhibition } from '../interfaces/exhibition';

describe('VenueService', () => {
  let service: VenueService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VenueService],
    });
    service = TestBed.inject(VenueService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('перевірка методу отримування даних', () => {
    const mockExhibitions: Exhibition[] = [
      { id: '1', title: 'Exhibition 1', date: '2023-01-01', venue: 'Venue A' },
      { id: '2', title: 'Exhibition 2', date: '2023-02-01', venue: 'Venue B' },
    ];

    service.getExhibitons().subscribe((exhibitions) => {
      expect(exhibitions).toEqual(mockExhibitions);
    });

    const req = httpMock.expectOne(service.api);
    expect(req.request.method).toBe('GET');
    req.flush(mockExhibitions);
  });

  it('перевірка методу встановлення', () => {
    const newExhibition: Exhibition = {
      id: '3',
      title: 'New Exhibition',
      date: '2023-03-01',
      venue: 'Venue C',
    };

    service.addExhibition(newExhibition).subscribe((exhibition) => {
      expect(exhibition).toEqual(newExhibition);
    });

    const req = httpMock.expectOne(service.api);
    expect(req.request.method).toBe('POST');
    req.flush(newExhibition);
  });

  it('перевірка методу оновлення', () => {
    const updatedExhibition: Exhibition = {
      id: '1',
      title: 'Updated Exhibition',
      date: '2023-04-01',
      venue: 'Updated Venue',
    };
    const id = '1';

    service.updateExhibitiom(id, updatedExhibition).subscribe((exhibition) => {
      expect(exhibition).toEqual(updatedExhibition);
    });

    const req = httpMock.expectOne(`${service.api}/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedExhibition);
  });

  it('перевірка методу видалення', () => {
    const id = '1';

    service.deleteExhibition(id).subscribe(() => {});

    const req = httpMock.expectOne(`${service.api}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('перевірка отримування виставки по ідентифікатору', () => {
    const id = '1';
    const mockExhibition: Exhibition = {
      id,
      title: 'Exhibition 1',
      date: '2023-01-01',
      venue: 'Venue A',
    };

    service.getExhibitionById(id).subscribe((exhibition) => {
      expect(exhibition).toEqual(mockExhibition);
    });

    const req = httpMock.expectOne(`${service.api}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockExhibition);
  });
});
