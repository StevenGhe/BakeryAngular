import { Component, OnInit, Input } from '@angular/core';
import { MessengerService } from 'src/app/_services/messenger.service'
import { CartService } from 'src/app/_services/cart.service'
import { Product } from 'src/app/_models/product.model';

@Component({
  selector: 'shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {

  @Input() productItem: Product;

  constructor(
    private msg: MessengerService,
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  handleAddToCart() {
    // this.cartService.addProductToCart(this.productItem);
  }
}
