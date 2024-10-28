import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin/admin.component';
import { SeatSelectionComponent } from './seat/seat.component';

export const routes: Routes = [
  /**PUBLIC ROUTES */
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cart', component: CartComponent},
  {path: 'home', component: HomeComponent},


  /**ADMIN ROUTES */
  {path: 'admin', component: AdminComponent},

  /**MOVIE SHOWING */
  { path: 'seat', component: SeatSelectionComponent }
];



