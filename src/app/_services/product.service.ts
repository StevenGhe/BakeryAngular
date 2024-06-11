import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { productsUrl, productUrl } from 'src/app/_config/api';

import { Product } from 'src/app/_models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }


    getProducts(): Observable<any> {
        return this.http.get<any>(productsUrl);
    }

    getProduct(id: number): Observable<Product> {
        let url = productUrl + id;
        return this.http.get<Product>(url);
    }

}
