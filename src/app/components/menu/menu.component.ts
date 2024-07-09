import { Component, OnInit } from '@angular/core';
import { VenueService } from 'src/app/services/venue.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isClose: boolean = true;

  constructor(private venueService: VenueService) {}
  ngOnInit(): void {
    this.venueService.menuOpen$.subscribe((value) => {
      this.isClose = !value;
    });
  }

  closeMenu() {
    this.venueService.isMenuOpen(false);
  }
}
