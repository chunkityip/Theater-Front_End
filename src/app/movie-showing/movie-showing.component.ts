import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';
import { MovieShowing } from '../movieshowing';

@Component({
  selector: 'app-movie-showing',
  standalone: true,
  imports: [CommonModule, MovieShowingComponent],
  templateUrl: './movie-showing.component.html',
  styleUrl: './movie-showing.component.css'
})
export class MovieShowingComponent {
  @Input() movieShowing!: MovieShowing;
}
