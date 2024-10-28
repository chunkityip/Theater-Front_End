import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private readonly apiService: ApiService, private router: Router) { }
  formData: any = {
    name: '',
  }

  message: any = null;


  async handleSubmit() {
    if (!this.formData.name) {
      this.showMessage("Field required");
      return;
    }

    try {
      // Call your registration API here (assuming async for now)
      await firstValueFrom(this.apiService.registerUser(this.formData));

      window.alert(`User successfully registered. Username will be " ${this.formData.name} "`);

      // Navigate to login after a short delay to allow the user to read the message
      setTimeout(() => {
        this.router.navigate(['/login']);
      });

    } catch (error: any) {
      console.log(error);
      this.showMessage(error.error?.message || error.message || 'Unable to register');
    }
  }


  showMessage(message: string) {
    this.message = message;

    // Add the fade-out effect before hiding the message
    setTimeout(() => {
      const messageElement = document.querySelector('.message');
      if (messageElement) {
        messageElement.classList.add('fade-out');
      }
    });
  }

}
