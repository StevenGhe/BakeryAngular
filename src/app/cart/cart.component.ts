import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../_models/cart-item.model';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartList: CartItem[];
  totalPrice: number;

  constructor(
    private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(res => this.cartList = res);
    this.cartService.totalCost.subscribe(res => this.totalPrice = res);
  }

  quantityChanged(arg: any, productId: number): void {
    if (arg == 0) {
      this.cartService.removeProductFromCart(productId);
    }
    this.cartService.recalculateTotal();
  }

  removeFromCart(id: number) {
    this.cartService.removeProductFromCart(id);
  }

}
