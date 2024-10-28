import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface Slide {
  imgSrc: string;
  imgAlt: string;
}

@Component({
  selector: 'app-touch-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './touch-slider.component.html',
  styleUrl: './touch-slider.component.css'
})
export class TouchSliderComponent {

  @Input() images: Slide[] = [];

  selectedIndex = 0;

  showPrev(i: number) {
    if (this.selectedIndex > 0) {
      this.selectedIndex = i - 1;
    }
  }

  showNext(i: number) {
    if(this.selectedIndex < this.images?.length -1) {
      this.selectedIndex = i + 1;
    }
  }
}
