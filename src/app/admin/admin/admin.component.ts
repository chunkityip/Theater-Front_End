import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  adminName: string | null = null;
  userProfile: any = null;

  // Add image URLs
  readonly buttonImages = {
    createMovie: 'https://d150u0abw3r906.cloudfront.net/wp-content/uploads/2021/03/how-to-make-a-movie.jpg',
    addShowing: 'https://media.istockphoto.com/id/1047762070/photo/small-movie-theater.jpg?s=612x612&w=0&k=20&c=tVqKDamk2QEsUe9kYlaJc9A5cQvRFtRqCuTYvLXvT2s=',
    dataAnalyze: 'https://www.pngitem.com/pimgs/m/247-2471474_csg-data-analytics-data-analytics-png-transparent-png.png'
  };

  constructor(private readonly apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.adminName = this.apiService.getAdminName();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
