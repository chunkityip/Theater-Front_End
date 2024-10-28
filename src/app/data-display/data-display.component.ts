import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.css'
})
export class DataDisplayComponent implements OnInit{
  httpClient = inject(HttpClient);
  @ViewChild('movieList') movieList!: ElementRef;
  data: any[] = [];
  scrollPosition: number = 0;
  itemWidth: number = 200 + 190; // Item width + margin-right
  visibleItems: number = 3; // Number of items to show at once

  ngOnInit(): void {
    this.fetchData();
  }
  
  fetchData(){
    this.httpClient
      .get('http://localhost:8080/home')
      .subscribe((data: any) => {
        console.log(data);
        this.data = data;
      });
  }

  scrollLeft() {
    const list = this.movieList.nativeElement;

    // Move to the previous set of items
    this.scrollPosition += this.itemWidth;

    // If we go past the start, jump to the end
    if (this.scrollPosition > 0) {
      this.scrollPosition = -this.itemWidth * (this.data.length - this.visibleItems);
    }

    list.style.transform = `translateX(${this.scrollPosition}px)`;
  }

  scrollRight() {
    const list = this.movieList.nativeElement;

    // Move to the next set of items
    this.scrollPosition -= this.itemWidth;

    // If we go past the end, jump to the start
    if (Math.abs(this.scrollPosition) >= this.itemWidth * (this.data.length - this.visibleItems + 1)) {
      this.scrollPosition = 0; // Jump to the start
    }

    list.style.transform = `translateX(${this.scrollPosition}px)`;
  }
  
}
