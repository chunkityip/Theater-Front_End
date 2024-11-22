import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Movie {
  id: number;
  title: string;
  description: string;
  coverImageBase64: string;
}

// Updated AddShowingDTO to include 'available' in timeSlot
export interface AddShowingDTO {
  movieId: number;
  date: string; // Format: YYYY-MM-DD
  timeSlot: {
    time: string; // Format: HH:mm
    available?: boolean; // Optional property
  };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private static BASE_URL = 'http://localhost:8080';
  private adminName: string | null = ''; // Store admin name

  // Event emitter for auth status change
  public authStatusChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  // Set and Get Admin Name
  setAdminName(name: string): void {
    this.adminName = name;
    this.authStatusChanged.emit(); // Emit change whenever adminName is updated
  }

  getAdminName(): string | null {
    return this.adminName;
  }

  /** Auth */
  registerUser(registration: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/user/register`, registration);
  }

  loginUser(loginDetails: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/user/login`, loginDetails);
  }

  getUserProfile(adminId: string): Observable<any> {
    return this.http.get(`${ApiService.BASE_URL}/user/profile/${adminId}`);
  }

  /** Movies */
  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${ApiService.BASE_URL}/movie/allMovies`)
  }

  /** Shopping cart */
  createOrder(orderRequest: any): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/order/create`, orderRequest);
  }

  /** Admin */
  createMovie(formData: FormData): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/movie/create`, formData);
  }

  addNewShowing(showingData: AddShowingDTO): Observable<any> {
    return this.http.post(`${ApiService.BASE_URL}/movie/${showingData.movieId}/showings/add_new`, showingData);
  }


  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${ApiService.BASE_URL}/movie/${id}`);
  }
}
