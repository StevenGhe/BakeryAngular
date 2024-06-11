import { Component, OnInit } from '@angular/core';
import { CartItem } from '../_models/cart-item.model';
import { CartService } from '../_services/cart.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { Order } from '../_models/order.model';
import { CheckoutService } from '../_services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  totalPrice: number;
  cartList: CartItem[];

  order: Order;
  rememberInfo: boolean;

  constructor(
    private cartService: CartService,
    private orderService: CheckoutService) {
  }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(res => this.cartList = res);
    this.cartService.totalCost.subscribe(res => this.totalPrice = res);
    this.order = this.orderService.orderCheckoutInfo;

    //If there was preset firstname, set rememberInfo again to true
    if (this.order.firstName != '') {
      this.rememberInfo = true;
    }
  }

  confirmOrder() {
    if (this.rememberInfo) {
      this.orderService.saveCheckoutInfo(this.order);
    } 

    if (this.cartList.length > 0) {
      //TODO validation
      this.order.cartItems = this.cartList;
      console.log(this.order);
      //Go to /checkout
    }
  }

  onTimeChange($event: any, group: any) {
    group.value = $event.value;
    this.order.time = $event.value;
  }

}
