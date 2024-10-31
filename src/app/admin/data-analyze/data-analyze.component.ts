import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SummaryData {
  label: string;
  value: number | string;
}

interface LocationData {
  location: string;
  value: number;  // Added value property to match usage
}

interface YearlyData {
  year: number;
  value: number;
}

interface DepartmentData {
  department: string;
  employees: number;
}

interface EmployeeGrowthData {
  year: number;
  count: number;
}

@Component({
  selector: 'app-data-analyze',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-analyze.component.html',
  styleUrls: ['./data-analyze.component.css']
})
export class DataAnalyzeComponent {
  summaryData: SummaryData[] = [
    { label: 'Total Revenue', value: '$246,351' },
    { label: 'Total Employees', value: 156 },
    { label: 'Total Customers', value: 107507 },  // Removed comma to fix syntax
    { label: 'Average Sales/Day', value: '$4,523' },
    { label: 'Customer Growth', value: '8.5%' }
  ];

  yearlyGrowth: YearlyData[] = [
    { year: 2020, value: 25 },
    { year: 2021, value: 35 },
    { year: 2022, value: 45 },
    { year: 2023, value: 52 },
    { year: 2024, value: 65 }
  ];

  locationData: LocationData[] = [
    { location: 'Soda', value: 45 },
    { location: 'PopCorn', value: 30 },
    { location: 'Los Angeles', value: 35 },
    { location: 'Miami', value: 25 },
    { location: 'Boston', value: 20 }
  ];

  departmentData: DepartmentData[] = [
    { department: 'John Wick', employees: 45 },
    { department: 'John Wick 2 ', employees: 25 },
    { department: 'John Wick 3 ', employees: 0 },
  ];

  employeeGrowth: EmployeeGrowthData[] = [
    { year: 2020, count: 85 },
    { year: 2021, count: 95 },
    { year: 2022, count: 120 },
    { year: 2023, count: 140 },
    { year: 2024, count: 156 }
  ];
}
