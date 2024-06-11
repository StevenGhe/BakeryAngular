import { ProductCategory } from "./productCategory.model";

export interface Product {
    id: number;
    category: ProductCategory
    product_name: string;
    description: string;
    price: number;

    imageUrl: string;
    smallImageUrl: string;

    disabled: boolean;
    discount: number;
    allergies: string;
    creationDate: string;
}
