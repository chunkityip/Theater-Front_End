import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SummaryData {
  label: string;
  value: string | number;
  icon: string;
  iconClass: string;
}

interface MovieData {
  name: string;
  revenue: number;
  tickets: number;
}

interface DailySalesData {
  day: string;
  sales: number;
}

interface ConcessionData {
  item: string;
  sales: number;
  profit: number;
}

interface HourlySalesData {
  time: string;
  tickets: number;
  popcorn: number;
}

@Component({
  selector: 'app-data-analyze',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-analyze.component.html',
  styleUrls: ['./data-analyze.component.css']
})
export class DataAnalyzeComponent implements OnInit {
  summaryData: SummaryData[] = [
    { 
      label: 'Top Movie',
      value: 'Avengers',
      icon: 'trending_up',
      iconClass: 'revenue'
    },
    { 
      label: 'Best Day',
      value: 'Saturday',
      icon: 'local_activity',
      iconClass: 'tickets'
    },
    { 
      label: 'Peak Time',
      value: '8:00 PM',
      icon: 'schedule',
      iconClass: 'time'
    },
    { 
      label: 'Top Concession',
      value: 'Popcorn',
      icon: 'fastfood',
      iconClass: 'food'
    }
  ];

  movieData: MovieData[] = [
    { name: 'Star Wars', revenue: 3750, tickets: 250 },
    { name: 'Avengers', revenue: 4500, tickets: 300 },
    { name: 'John Wick 2', revenue: 4200, tickets: 280 },
    { name: 'Dune 2', revenue: 4050, tickets: 270 }
  ];

  dailySalesData: DailySalesData[] = [
    { day: 'Monday', sales: 120 },
    { day: 'Tuesday', sales: 150 },
    { day: 'Wednesday', sales: 180 },
    { day: 'Thursday', sales: 200 },
    { day: 'Friday', sales: 350 },
    { day: 'Saturday', sales: 400 },
    { day: 'Sunday', sales: 320 }
  ];

  concessionData: ConcessionData[] = [
    { item: 'Popcorn', sales: 450, profit: 360 },
    { item: 'Soda', sales: 380, profit: 304 },
    { item: 'Candy', sales: 220, profit: 154 },
    { item: 'Nachos', sales: 180, profit: 126 },
    { item: 'Soup', sales: 120, profit: 84 }
  ];

  hourlySalesData: HourlySalesData[] = [
    { time: '10:00 AM', tickets: 8, popcorn: 2 },
    { time: '12:00 PM', tickets: 12, popcorn: 9 },
    { time: '2:00 PM', tickets: 18, popcorn: 15 },
    { time: '4:00 PM', tickets: 22, popcorn: 18 },
    { time: '6:00 PM', tickets: 20, popcorn: 13 },
    { time: '8:00 PM', tickets: 25, popcorn: 23 }
  ];

  // Calculated maximums for scaling
  maxRevenue: number = 0;
  maxDailySales: number = 0;
  maxConcessionSales: number = 0;
  maxHourlyTickets: number = 0;
  maxHourlyPopcorn: number = 0;

  ngOnInit() {
    this.calculateMaxValues();
  }

  private calculateMaxValues() {
    this.maxRevenue = Math.max(...this.movieData.map(m => m.revenue));
    this.maxDailySales = Math.max(...this.dailySalesData.map(d => d.sales));
    this.maxConcessionSales = Math.max(...this.concessionData.map(c => c.sales));
    this.maxHourlyTickets = Math.max(...this.hourlySalesData.map(h => h.tickets));
    // this.maxHourlyTickets = Math.max(...this.hourlySalesData.map(h => h.tickets));
    this.maxHourlyPopcorn = Math.max(...this.hourlySalesData.map(h => h.popcorn));
  }
}