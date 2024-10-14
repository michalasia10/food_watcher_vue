import {ConsumedProduct} from '@/feature/myday/domain/entities/ConsumedProduct';
import {Macro} from '@/core/domain/Macro';

export class Meal {
    constructor(
        public type: string,
        public products: ConsumedProduct[],
        public macro: Macro,
    ) {
    }

    static fromJSON(json: any): Meal {
        return new Meal(
            json.meal,
            json.products.map((product: any) => ConsumedProduct.fromJSON(product)),
            new Macro(
                '',
                json.summary.calories,
                json.summary.protein,
                json.summary.carbs,
                json.summary.fat,
            )
        );
    }

}