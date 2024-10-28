import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];

  constructor() {
      if (this.isBrowser()) {
        const savedCart = localStorage.getItem('cart');
        this.cart = savedCart ? JSON.parse(savedCart) : [];
      } else {
        this.cart = [];
      }
    }

    private isBrowser(): boolean {
      return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    }

  getCart() {
    return this.cart;
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addItem(item: any) {
    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }
    this.saveCart();
  }

  removeItem(itemId: number) {
    this.cart = this.cart.filter(item => item.id !== itemId);
    this.saveCart();
  }

  incrementItem(itemId: number) {
    const item = this.cart.find(cartItem => cartItem.id === itemId);
    if (item) {
      item.quantity += 1;
      this.saveCart();
    }
  }

  decrementItem(itemId: number) {
    const item = this.cart.find(cartItem => cartItem.id === itemId);
    if (item) {
      item.quantity > 1 ? item.quantity -= 1 : this.removeItem(itemId);
      this.saveCart();
    }
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
  }
}

