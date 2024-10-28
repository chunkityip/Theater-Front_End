import { Component } from '@angular/core';
import { MovieShowingComponent } from '../movie-showing/movie-showing.component';
import { MovieShowing } from '../movieshowing';
import { CommonModule } from '@angular/common';
import { DataDisplayComponent } from '../data-display/data-display.component';
import { TouchSliderComponent } from '../touch-slider/touch-slider.component';
import { HammerModule } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MovieShowingComponent,HammerModule, CommonModule, DataDisplayComponent, TouchSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  // movieShowingList: MovieShowing[] = [
  //   {
  //     id: 0,
  //     name: 'Star Wars',
  //     description: 'Once Upon a Time',
  //     photo: `${this.baseUrl}/example-house.jpg`,
  //   },
  //   {
  //     id: 1,
  //     name: 'Clone Wars',
  //     description: 'Once Upon a Time',
  //     photo: `${this.baseUrl}/example-house.jpg`,
  //   },
  // ];

  title = 'touch-slider';

  images = [
    {
      imgSrc: 'https://static.vecteezy.com/system/resources/thumbnails/003/582/701/small/coming-soon-background-illustration-template-design-free-vector.jpg',
      imgAlt: 'Image 1',
    },
    {
      imgSrc: 'https://static.vecteezy.com/system/resources/thumbnails/003/582/701/small/coming-soon-background-illustration-template-design-free-vector.jpg',
      imgAlt: 'Image 2',
    },
  ]
}
