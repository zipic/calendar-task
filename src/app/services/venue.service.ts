import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Exhibition } from '../interfaces/exhibition';

@Injectable({
  providedIn: 'root',
})
export class VenueService {
  api: string = 'http://localhost:3000/exhibitions';
  menuOpen = new BehaviorSubject<boolean>(false);
  menuOpen$ = this.menuOpen.asObservable();
  editedExibition = new BehaviorSubject<Exhibition | null>(null);
  editedExibition$ = this.editedExibition.asObservable();

  constructor(private http: HttpClient) {}

  isMenuOpen(value: boolean) {
    this.menuOpen.next(value);
  }

  setEditExhibition(exhibition: Exhibition) {
    this.editedExibition.next(exhibition);
  }

  getExhibitons(): Observable<Exhibition[]> {
    return this.http.get<Exhibition[]>(`${this.api}`);
  }

  addExhibition(exhibition: Exhibition): Observable<Exhibition> {
    return this.http.post<Exhibition>(`${this.api}`, exhibition);
  }

  updateExhibitiom(id: string, exhibition: Exhibition): Observable<Exhibition> {
    return this.http.put<Exhibition>(`${this.api}/${id}`, exhibition);
  }

  deleteExhibition(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  getExhibitionById(id: string): Observable<Exhibition> {
    return this.http.get<Exhibition>(`${this.api}/${id}`);
  }
}
