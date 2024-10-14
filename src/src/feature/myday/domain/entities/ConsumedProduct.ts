import Entity from "@/core/domain/Entity";
import {Macro} from "@/core/domain/Macro";
import {Product} from "@/feature/myday/domain/entities/Product";

export class ConsumedProduct extends Entity<ConsumedProduct> {
    constructor(
        id: string | undefined,
        public productId: string,
        public weightInGrams: number,
        public type: string,
        public baseProduct: Product,
        public macro: Macro,
    ) {
        super(id);
    }

    static fromJSON(json: any): ConsumedProduct {
        return new ConsumedProduct(
            json.id,
            json.product_id,
            json.weight_in_grams,
            json.type,
            Product.fromJSON(json.product),
            new Macro(
                '',
                json.calories,
                json.proteins,
                json.carbohydrates,
                json.fat,
            )
        );
    }
}