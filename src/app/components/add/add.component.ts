import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Exhibition } from 'src/app/interfaces/exhibition';
import { VenueService } from 'src/app/services/venue.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  addVenueForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private venueService: VenueService,
    private router: Router
  ) {
    this.addVenueForm = this.fb.group({
      id: [Math.random().toString(), Validators.required],
      title: ['', Validators.required],
      date: ['', Validators.required],
      venue: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addVenueForm.valid) {
      const newVenue: Exhibition = this.addVenueForm.value;
      this.venueService.addExhibition(newVenue).subscribe(response => {
      });
    }
    this.router.navigate(['/']);
  }
}
