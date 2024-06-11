import { Component, OnInit, ViewEncapsulation, SimpleChanges } from '@angular/core';

import { Product } from '../_models/product.model';
import { ProductService } from '../_services/product.service';
import { ProductCategory } from '../_models/productCategory.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShopComponent implements OnInit {
  loading: boolean = false;
  productList: any[] = [];
  filteredProductList: any[] = [];

  orderMap: Object;
  currentOrder: number = 1; //key/value index of orderMap

  categoryList: string[] = [];
  currentCategory: string = 'Brood';

  currentPage: number = 1;
  productsPerPage: number = 10;
  collectionSize: number = 0;
  maxSize: number = 2;
  firstLastButtons = true;
  nextPreviousButtons = true;
  small = false;
  totalPages: any[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.loadOrders();
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts().subscribe((products) => {
      this.productList = products;
      this.filteredProductList = this.productList;

      //Get category list from all products
      this.productList.forEach(product => {
        const productCategory = product.category_name;
        if (productCategory && this.categoryList.indexOf(productCategory) === -1) {
          this.categoryList.push(productCategory);
        }
      });

      this.filterProduct(this.currentCategory);
      this.orderProducts(this.currentOrder);
      this.recalculatePaginator();
      this.loading = false;
    });
  }

  /** Update totalPage number if the collectionSize or pageSize values change */
  recalculatePaginator() {
    this.collectionSize = this.filteredProductList.length;
    this.totalPages = new Array(Math.ceil(this.collectionSize / this.productsPerPage));
    this.currentPage = 1;
  }

  /** Set page number */
  selectPageNumber(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  /** Set next page number */
  next() {
    const nextPage = this.currentPage + 1;
    nextPage <= this.totalPages.length && this.selectPageNumber(nextPage);
  }

  /** Set previous page number */
  previous() {
    const previousPage = this.currentPage - 1;
    previousPage >= 1 && this.selectPageNumber(previousPage);
  }

  filterProduct(cat: string) {
    this.currentCategory = cat;
    this.filteredProductList = this.productList.filter((product: any) => {
      return product.category_name === this.currentCategory || this.currentCategory === '';
    })

    this.orderProducts(this.currentOrder);
    this.recalculatePaginator();
  }


  loadOrders() {
    this.orderMap = {
      1: 'Sorteer alfabetisch',
      2: 'Sorteer op nieuwste producten',
      3: 'Sorteer op prijs: laag naar hoog',
      4: 'Sorteer op prijs: hoog naar laag'
    };
    this.currentOrder = 1;
  }

  orderProducts(order: any) {
    var orderNumber = parseInt(order);

    switch (orderNumber) {
      case 1:
        this.filteredProductList = this.filteredProductList.sort((a, b) => a.product_name.localeCompare(b.product_name));
        break;
      case 2:
        this.filteredProductList = this.filteredProductList.sort((a, b) => a.creationDate - b.creationDate);
        break;
      case 3:
        this.filteredProductList = this.filteredProductList.sort((a, b) => a.price - b.price);
        break;
      case 4:
        this.filteredProductList = this.filteredProductList.sort((a, b) => b.price - a.price);
        break;
    }
  }
}
