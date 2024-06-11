import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../_models/cart-item.model';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartList: CartItem[]
  totalPrice: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.loadCart();
    this.cartService.cartItems.subscribe(res => this.cartList = res);
    this.cartService.totalCost.subscribe(res => this.totalPrice = res);
  }

  removeFromCart(id: number) {
    this.cartService.removeProductFromCart(id);
  }

}
