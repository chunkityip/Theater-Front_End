import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

interface CreateMovieResponse {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  title: string = '';
  description: string = '';
  coverImage: File | null = null;
  message: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  handleImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.coverImage = input.files[0];
    }
  }

  handleSubmit(): void {
    if (!this.coverImage || !this.title || !this.description) {
      this.message = "Please fill in all fields";
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('coverImage', this.coverImage);

    this.apiService.createMovie(formData).subscribe({
      next: (response: CreateMovieResponse) => {
        // Navigate to movie-create component with the new movie ID
        this.router.navigate(['/movie-create', response.id]);
      },
      error: (error) => {
        console.error(error);
        this.message = error?.error?.message || "Unable to add movie";
      }
    });
  }
}
