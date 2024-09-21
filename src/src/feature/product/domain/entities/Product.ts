import Entity from "@/core/domain/Entity";
import {Macro} from "@/core/domain/Macro";

export class Product extends Entity<Product> {
    constructor(
        id: string | undefined,
        public name: string,
        public code: string,
        public image: string | undefined,
        public macro: Macro,
    ) {
        super(id);
    }


    static fromJSON(json: any): Product {
        return new Product(
            json.id,
            json.name,
            json.code,
            json?.image ? json.image : "https://logowik.com/content/uploads/images/burger8368.jpg",
            new Macro(
                '',
                json['energy_kcal_100g'],
                json['proteins_100g'],
                json['carbohydrates_100g'],
                json['fat_100g'],
            )
        );
    }
}