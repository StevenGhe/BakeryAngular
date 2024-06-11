import { CartItem } from './cart-item.model';

export class Order {
    cartItems: CartItem[];
    firstName: string;
    lastName: string;
    company: string;
    telephoneNr: string;
    email: string;
    comment: string;

    date: string;
    time: string;

    constructor(cartItems: CartItem[], firstName: string, lastName: string, company: string, telephoneNr: string, email: string, date: string, time: string, comment: string) {
        this.cartItems = cartItems;
        this.firstName = firstName;
        this.lastName = lastName;
        this.company = company;
        this.telephoneNr = telephoneNr;
        this.email = email;
        this.date = date;
        this.time = time;
        this.comment = comment;
    }
}
