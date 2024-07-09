import { Component } from '@angular/core';
import { VenueService } from 'src/app/services/venue.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isMenuOpen: boolean = false;

  constructor(private venueService: VenueService) {
    this.venueService.menuOpen$.subscribe((value) => {
      this.isMenuOpen = value;
    });
  }

  openMenu() {
    this.venueService.isMenuOpen(!this.isMenuOpen);
    console.log(this.isMenuOpen);
  }
}
