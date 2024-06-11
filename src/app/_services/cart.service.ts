import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { CartItem } from '../_models/cart-item.model';
import { cartUrl } from '../_config/api';
import { Product } from '../_models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private dataStore: { cartItems: CartItem[], total: number };

  private cartListSubject = new BehaviorSubject<CartItem[]>([]);
  private totalCostSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  get cartItems() {
    return this.cartListSubject.asObservable();
  }

  get totalCost() {
    return this.totalCostSubject.asObservable();
  }

  loadCart() {
    this.dataStore = this.getDataStoreFromStorage();
    if (this.dataStore == undefined) {
      this.dataStore = { cartItems: [], total: 0 };
    }
    this.cartListSubject.next(Object.assign({}, this.dataStore).cartItems);
    this.totalCostSubject.next(Object.assign({}, this.dataStore).total);
  }

  // loadAll() {
  //   this.http.get(`${this.baseUrl}/todos`).subscribe(
  //     data => {
  //       this.dataStore.todos = data;
  //       this._todos.next(Object.assign({}, this.dataStore).todos);
  //     },
  //     error => console.log('Could not load todos.')
  //   );
  // }

  addProductToCart(product: Product, quantity: number) {
    let sameCartItem = this.dataStore.cartItems.filter(cartItem => { return cartItem.product.id == product.id });
    if (sameCartItem.length > 0) {
      sameCartItem[0].quantity += quantity;
    } else {
      this.dataStore.cartItems.push({ product, quantity });
    }
    this.cartListSubject.next(Object.assign({}, this.dataStore).cartItems);
    this.recalculateTotal();
    this.saveToStorage();
  }

  removeProductFromCart(id: number) {
    this.dataStore.cartItems = this.dataStore.cartItems.filter(cartItem => { return cartItem.product.id !== id });
    this.cartListSubject.next(Object.assign({}, this.dataStore).cartItems);
    this.recalculateTotal();
    this.saveToStorage();
  }

  recalculateTotal() {
    let sum = 0;
    this.dataStore.cartItems.forEach((item) => {
      sum += item.quantity * item.product.price;
    })
    this.dataStore.total = Math.round(sum * 100) / 100;
    this.totalCostSubject.next(Object.assign({}, this.dataStore).total);
  }

  private saveToStorage(): void {
    const serializedStore = JSON.stringify(this.dataStore);
    localStorage.setItem('cartDataStore', serializedStore);
  }

  private getDataStoreFromStorage(): any {
    try {
      const serializedState = localStorage.getItem('cartDataStore');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }

}
