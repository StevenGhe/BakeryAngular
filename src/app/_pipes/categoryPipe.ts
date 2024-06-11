import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../_models/product.model';


@Pipe({
    name: 'categoryFilter'
})
export class CategoryPipe implements PipeTransform {

    transform(products: any, category: string): any {
        //check if the search term is defined
        if (!products || !category) return products;

        //return updated product array
        products.filter(function (p: any) {
            return p.category.name.toLowerCase().includes(category.toLowerCase());
        })
    }

}