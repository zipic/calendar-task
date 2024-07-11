import { Component, OnInit } from '@angular/core';
import { VenueService } from 'src/app/services/venue.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  isMenuOpen!: boolean;

  constructor(private venueService: VenueService) {}

  ngOnInit(): void {
    this.venueService.menuOpen$.subscribe((value) => {
      this.isMenuOpen = value;
    });
  }
}
