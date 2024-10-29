import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Movie {
  id: number;
  name: string;
  time?: string;
  theater?: string;
  duration?: string;
  showDates: string[];
  imageUrl: string;
}

interface SeatState {
  status: 'available' | 'occupied' | 'selected';
  id: string;
}

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatSelectionComponent implements OnInit {
  selectedMovie: Movie = {
    id: 1,
    name: 'Star Wars: The Phantom Menace',
    theater: 'Theater Name',
    time: 'Show Time',
    duration: 'Movie Duration',
    showDates: ['10/21', '10/22', '10/23', '10/24', '10/25'],
    imageUrl: 'https://m.media-amazon.com/images/M/MV5BODVhNGIxOGItYWNlMi00YTA0LWI3NTctZmQxZGUwZDEyZWI4XkEyXkFqcGc@._V1_.jpg'
  };

  seatLayout: SeatState[][] = [];
  showTimes: string[] = ['2:00 pm', '3:00 pm', '4:00 pm', '6:00 pm', '8:00 pm'];
  selectedDate: string = '10/21';
  selectedTime: string = '6:00 pm';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.initializeSeatLayout();
    if (this.isBrowser) {
      this.loadSavedData();
    }
  }

  private initializeSeatLayout(): void {
    this.seatLayout = Array(8).fill(null).map((_, rowIndex) =>
      Array(10).fill(null).map((_, seatIndex) => ({
        status: Math.random() < 0.3 ? 'occupied' : 'available',
        id: `${this.getRowLabel(rowIndex)}${seatIndex + 1}`
      }))
    );
  }

  getRowLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  onSeatClick(rowIndex: number, seatIndex: number): void {
    const seat = this.seatLayout[rowIndex][seatIndex];
    if (seat.status === 'occupied') return;

    seat.status = seat.status === 'selected' ? 'available' : 'selected';

    if (this.isBrowser) {
      this.saveToLocalStorage();
    }
  }

  selectDate(date: string): void {
    this.selectedDate = date;
    this.saveToLocalStorage();
  }

  selectTime(time: string): void {
    this.selectedTime = time;
    this.saveToLocalStorage();
  }

  hasSelectedSeats(): boolean {
    return this.seatLayout.some(row =>
      row.some(seat => seat.status === 'selected')
    );
  }

  continue(): void {
    const selectedSeats = this.seatLayout
      .flatMap(row => row.filter(seat => seat.status === 'selected'))
      .map(seat => seat.id);

    console.log('Selected seats:', selectedSeats);
    console.log('Selected date:', this.selectedDate);
    console.log('Selected time:', this.selectedTime);
    // Implement checkout logic here
  }

  private saveToLocalStorage(): void {
    if (!this.isBrowser) return;
    try {
      const dataToSave = {
        seatLayout: this.seatLayout,
        selectedDate: this.selectedDate,
        selectedTime: this.selectedTime
      };
      localStorage.setItem('seatSelection', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  private loadSavedData(): void {
    if (!this.isBrowser) return;
    try {
      const savedData = localStorage.getItem('seatSelection');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        this.seatLayout = parsed.seatLayout;
        this.selectedDate = parsed.selectedDate;
        this.selectedTime = parsed.selectedTime;
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }
}

