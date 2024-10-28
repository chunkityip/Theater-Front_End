import { Component } from '@angular/core';
import { ApiService } from "../service/api.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private readonly apiService: ApiService, private router: Router) {}

  searchValue: string = '';
  isAdminLoggedIn: boolean = false; // Track if the admin is logged in

  ngOnInit(): void {
    // Check if admin is logged in by checking the stored admin name
    this.isAdminLoggedIn = !!this.apiService.getAdminName();

    // Listen for changes in authentication status
    this.apiService.authStatusChanged.subscribe(() => {
      this.isAdminLoggedIn = !!this.apiService.getAdminName();
    });
  }

  handleSearchSubmit() {
    this.router.navigate(['/home'], { queryParams: { search: this.searchValue } });
  }

  handleLogin() {
    this.router.navigate(['/login']);
  }

  handleRegister() {
    this.router.navigate(['/register']);
  }

  handleLogout() {
    const confirm = window.confirm("Are you sure you want to log out?");
    if (confirm) {
      this.apiService.setAdminName(''); // Clear the admin name to log out
      this.router.navigate(['/login']);
      this.apiService.authStatusChanged.emit();
    }
  }
}





