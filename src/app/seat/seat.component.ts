import { Component, OnInit } from '@angular/core';

interface SeatType {
  id: string;
  status: 'available' | 'occupied' | 'selected';
}

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatSelectionComponent implements OnInit {
  movieTitle: string = 'Star Wars: The Phantom Menace';
  selectedDate: string = '';
  selectedTime: string = '';

  dates = [
    { value: '10/21', label: '10/21' },
    { value: '10/22', label: '10/22' },
    { value: '10/23', label: '10/23' },
    { value: '10/24', label: '10/24' },
    { value: '10/25', label: '10/25' }
  ];

  times = [
    { value: '2:00 pm', label: '2:00 pm' },
    { value: '3:00 pm', label: '3:00 pm' },
    { value: '4:00 pm', label: '4:00 pm' },
    { value: '6:00 pm', label: '6:00 pm' },
    { value: '8:00 pm', label: '8:00 pm' }
  ];

  seatMap: { [key: string]: SeatType[] } = {
    'A': Array.from({ length: 6 }, (_, i) => ({
      id: `A${i + 1}`,
      status: 'available'
    })),
    'B': Array.from({ length: 7 }, (_, i) => ({
      id: `B${i + 1}`,
      status: 'available'
    })),
    'C': Array.from({ length: 8 }, (_, i) => ({
      id: `C${i + 1}`,
      status: 'available'
    })),
    'D': Array.from({ length: 9 }, (_, i) => ({
      id: `D${i + 1}`,
      status: 'available'
    })),
    'E': Array.from({ length: 10 }, (_, i) => ({
      id: `E${i + 1}`,
      status: 'available'
    }))
  };

  constructor() {}

  ngOnInit(): void {
    // Set some seats as occupied for demonstration
    this.setSeatStatus('A3', 'occupied');
    this.setSeatStatus('B6', 'occupied');
    this.setSeatStatus('B7', 'occupied');
    this.setSeatStatus('C3', 'occupied');
    this.setSeatStatus('D3', 'occupied');
  }

  setSeatStatus(seatId: string, status: 'available' | 'occupied' | 'selected'): void {
    const row = seatId.charAt(0);
    const seatIndex = parseInt(seatId.slice(1)) - 1;
    if (this.seatMap[row] && this.seatMap[row][seatIndex]) {
      this.seatMap[row][seatIndex].status = status;
    }
  }

  toggleSeatSelection(seat: SeatType): void {
    if (seat.status === 'occupied') return;
    seat.status = seat.status === 'selected' ? 'available' : 'selected';
  }

  getSelectedSeats(): string[] {
    const selected: string[] = [];
    Object.values(this.seatMap).forEach(row => {
      row.forEach(seat => {
        if (seat.status === 'selected') {
          selected.push(seat.id);
        }
      });
    });
    return selected;
  }

  onContinue(): void {
    const selectedSeats = this.getSelectedSeats();
    console.log('Selected seats:', selectedSeats);
    console.log('Selected date:', this.selectedDate);
    console.log('Selected time:', this.selectedTime);
  }
}
