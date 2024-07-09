import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VenueService {
  menuOpen = new BehaviorSubject<boolean>(false);
  menuOpen$ = this.menuOpen.asObservable();

  constructor() {}

  isMenuOpen(value: boolean) {
    this.menuOpen.next(value);
  }
}
