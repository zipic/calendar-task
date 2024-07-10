import { Component, OnInit } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Exhibition } from 'src/app/interfaces/exhibition';
import { VenueService } from 'src/app/services/venue.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: [],
  };

  constructor(private venueService: VenueService) {

  }
  ngOnInit(): void {
    this.venueService.getExhibitons().subscribe(value => {
      this.calendarOptions.events = value;
    })
  }
}
