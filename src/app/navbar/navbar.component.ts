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

  handleSearchSubmit() {
    this.router.navigate(['/home'], { queryParams: { search: this.searchValue } });
  }

  handleLogin() {
    this.router.navigate(['/login']);
  }

  handleRegister() {
    this.router.navigate(['/register']);
  }
}




