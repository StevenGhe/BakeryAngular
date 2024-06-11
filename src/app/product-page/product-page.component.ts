import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_models/product.model';
import { CartService } from '../_services/cart.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageCompontent implements OnInit {
  loading: boolean = false;

  productItem: Product;

  productPageForm = this.formBuilder.group({
    quantity: 1
  });

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(): void {
    this.loading = true;

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(id).subscribe(productItem => {
      this.productItem = productItem;
      this.loading = false;
    })

  }

  addToCart(): void {
    this.cartService.addProductToCart(this.productItem, this.productPageForm.get('quantity')!.value!);
  }

}
