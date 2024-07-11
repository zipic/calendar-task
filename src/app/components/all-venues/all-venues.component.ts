import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exhibition } from 'src/app/interfaces/exhibition';
import { VenueService } from 'src/app/services/venue.service';

@Component({
  selector: 'app-all-venues',
  templateUrl: './all-venues.component.html',
  styleUrls: ['./all-venues.component.css'],
})
export class AllVenuesComponent implements OnInit {
  exhibitions: Exhibition[] = [];

  constructor(private venueService: VenueService, private router: Router) {}

  ngOnInit(): void {
    this.venueService.getExhibitons().subscribe((value) => {
      this.exhibitions = value;
    });
  }

  deleteVenue(id: string) {
    this.venueService.deleteExhibition(id).subscribe(() => {
      this.exhibitions = this.exhibitions.filter(
        (exhibition) => exhibition.id !== id
      );
    });
  }

  editVenue(exhibition: Exhibition) {
    this.venueService.setEditExhibition(exhibition);
    this.router.navigate(['edit']);
  }
}
