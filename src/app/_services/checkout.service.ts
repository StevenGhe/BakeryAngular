import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { CartItem } from '../_models/cart-item.model';
import { cartUrl } from '../_config/api';
import { Product } from '../_models/product.model';
import { Order } from '../_models/order.model';

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {
    private checkoutInfoDataStore: { order: Order };

    constructor(private http: HttpClient) { }

    get orderCheckoutInfo(): Order {
        if (this.checkoutInfoDataStore == null) {
            this.checkoutInfoDataStore = this.getDataStoreFromStorage();
        }
        if (this.checkoutInfoDataStore == null) {
            this.checkoutInfoDataStore = { order: new Order([], '', '', '', '', '', '', '', '') }
        }

        return this.checkoutInfoDataStore.order;
    }


    saveCheckoutInfo(order: Order) {
        this.checkoutInfoDataStore.order = Object.assign({}, order);
        this.checkoutInfoDataStore.order.date = '';
        this.checkoutInfoDataStore.order.time = '';

        const serializedStore = JSON.stringify(this.checkoutInfoDataStore);
        localStorage.setItem('checkoutDataStore', serializedStore);
    }

    private getDataStoreFromStorage(): any {
        try {
            const serializedState = localStorage.getItem('checkoutDataStore');
            if (serializedState === null) {
                return undefined;
            }
            return JSON.parse(serializedState);
        } catch (err) {
            return undefined;
        }
    }

}
