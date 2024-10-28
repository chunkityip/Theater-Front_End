import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData: any = {
    name: '',
  };

  message: any = null;

  constructor(private readonly apiService: ApiService, private router: Router) {}

  async handleSubmit() {
      if (!this.formData.name) {
        this.showMessage("Fields required");
        return;
      }

      try {
        const response: any = await firstValueFrom(
          this.apiService.loginUser({ name: this.formData.name })
        );

        // Set the admin name in ApiService based on login response
        this.apiService.setAdminName(response.name);

        // Fetch user profile using the admin ID from response (assuming the response has an ID)
        const adminId = response.id; // Modify this based on your actual response structure
        const userProfile = await firstValueFrom(this.apiService.getUserProfile(adminId));

        // You might want to store user profile data in a service or state management
        console.log('User Profile:', userProfile);

        this.showMessage('User Successfully logged in');
        this.router.navigate(['/admin']); // Navigate to admin page

      } catch (error: any) {
        console.log(error);
        window.alert('Username not found! Unable to login!');
      }
    }

    showMessage(message: string) {
      this.message = message;
      setTimeout(() => {
        this.message = null;
      }, 3000);
    }
  }
