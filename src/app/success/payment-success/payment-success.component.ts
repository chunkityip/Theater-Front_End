import { Component, OnInit } from '@angular/core';

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

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  paymentId: string = '';
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

  ngOnInit() {
    // In a real application, you would get these details from a service
    this.paymentId = Math.random().toString(36).substring(7).toUpperCase();
  }
}
