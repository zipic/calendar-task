import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Exhibition } from 'src/app/interfaces/exhibition';
import { VenueService } from 'src/app/services/venue.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  editVenueForm!: FormGroup;
  exhibition!: Exhibition;

  constructor(
    private venueService: VenueService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editVenueForm = this.fb.group({
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      venue: ['', [Validators.required]],
    });

    this.venueService.editedExibition$.subscribe((exhibition) => {
      if (exhibition) {
        this.exhibition = exhibition;
        this.editVenueForm.patchValue({
          title: exhibition.title,
          date: exhibition.date,
          venue: exhibition.venue,
        });
      }
    });
  }

  onSubmit(): void {
    if (this.editVenueForm.valid) {
      const updatedExhibition = {
        ...this.exhibition,
        ...this.editVenueForm.value,
      };
      this.venueService
        .updateExhibitiom(updatedExhibition.id, updatedExhibition)
        .subscribe(() => {
          this.router.navigate(['all']);
        });
    }
  }
}
