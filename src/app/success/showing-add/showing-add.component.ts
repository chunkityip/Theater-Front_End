import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MovieTicket {
  id: string;
  title: string;
  theaterName: string;
  showDate: string;
  showTime: string;
  duration: string;
  price: number;
  imageUrl: string;
}

interface Showing {
  id: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-showing-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showing-add.component.html', // Updated path
  styleUrls: ['./showing-add.component.css']  // Updated path
})
export class ShowingAddComponent implements OnInit {
  movieId: string = '';
  ticket: MovieTicket = {
    id: '12345',
    title: 'Star Wars: The Phantom Menace',
    theaterName: 'Cinema City',
    showDate: '2024-10-26',
    showTime: '19:30',
    duration: '136 min',
    price: 15.99,
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BODVhNGIxOGItYWNlMi00YTA0LWI3NTctZmQxZGUwZDEyZWI4XkEyXkFqcGc@._V1_.jpg'
  };

  showings: Showing[] = [
    { id: "44", date: "10/23/2024", time: "6:00 pm" },
    { id: "45", date: "10/23/2024", time: "8:00 pm" }
  ];

  ngOnInit() {
    this.movieId = Math.random().toString(36).substring(7).toUpperCase();
  }
}
