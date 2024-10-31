import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';

interface Movie {
  id: number;
  title: string;
  description: string;
  coverImage?: string;
}

interface ShowingResponse {
  id: number;
  movieId: number;
  movieTitle: string;
  showingDate: string;
  showingTime: string;
  seats: any;
}

@Component({
  selector: 'app-existing-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './existing-moving.component.html',
  styleUrls: ['./existing-moving.component.css']
})
export class ExistingMovieComponent implements OnInit {
  movies: Movie[] = [];
  currentMovieIndex = 0;
  showingForm: FormGroup;

  currentDate: string = new Date().toISOString().split('T')[0];
  minDate: string = this.currentDate;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private fb: FormBuilder
  ) {
    this.showingForm = this.fb.group({
      movieId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      showingDate: [this.currentDate, Validators.required],
      showingTime: ['', [
        Validators.required,
        Validators.pattern('^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$')
      ]]
    });
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.apiService.getAllMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
      }
    });
  }

  previousMovie(): void {
    if (this.currentMovieIndex > 0) {
      this.currentMovieIndex--;
    }
  }

  nextMovie(): void {
    if (this.currentMovieIndex < this.movies.length - 5) {
      this.currentMovieIndex++;
    }
  }

  // Helper method to format time input
  formatTimeInput(event: any): void {
    let input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove non-digits

    if (value.length > 4) {
      value = value.substr(0, 4);
    }

    if (value.length >= 2) {
      const hours = parseInt(value.substr(0, 2));
      if (hours > 23) {
        value = '23' + value.substr(2);
      }
      if (value.length >= 3) {
        const minutes = parseInt(value.substr(2));
        if (minutes > 59) {
          value = value.substr(0, 2) + '59';
        }
      }
      value = value.substr(0, 2) + ':' + value.substr(2);
    }

    input.value = value;
    this.showingForm.get('showingTime')?.setValue(value);
  }

  handleSubmit(): void {
    if (this.showingForm.valid) {
      const showingData = {
        movieId: parseInt(this.showingForm.get('movieId')?.value),
        date: this.showingForm.get('showingDate')?.value,
        timeSlot: {
          time: this.showingForm.get('showingTime')?.value,
          available: true
        }
      };

      this.apiService.addNewShowing(showingData).subscribe({
        next: (response: ShowingResponse) => {
          console.log('Showing added successfully', response);
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          console.error('Error adding showing:', error);
        }
      });
    } else {
      Object.keys(this.showingForm.controls).forEach(key => {
        const control = this.showingForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }


}
