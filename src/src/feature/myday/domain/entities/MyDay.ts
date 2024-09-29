import Entity from "@/core/domain/Entity";
import {Macro} from "@/core/domain/Macro";
import {ConsumedProduct} from "@/feature/myday/domain/entities/ConsumedProduct";

export class MyDay extends Entity<MyDay> {
    constructor(
        id: string | undefined,
        public userId: string,
        public date: string | Date,
        public consumedProducts: ConsumedProduct[],
        public summary: Macro,
        public user: Macro,
    ) {
        super(id);
        this.date = date instanceof Date ? date : new Date(date);
    }

    public get localDate(): string {
        return this.date instanceof Date ? this.date.toLocaleDateString() : new Date(this.date).toLocaleDateString();
    }


    public get getVarianceMacro(): Macro {
        return new Macro(
            '',
            this.summary.getKcal - this.user.getKcal,
            this.summary.getProtein - this.user.getProtein,
            this.summary.getCarbs - this.user.getCarbs,
            this.summary.getFat - this.user.getFat,
        );
    }

    static addProductPayload(date: Date, productId: string, weightInGrams: number, type: string) {
        return {
            date: date.toISOString(),
            product_id: productId,
            weight_in_grams: weightInGrams,
            type: type
        }
    }

    static fromJSON(json: any): MyDay {
        return new MyDay(
            json.id,
            json.user_id,
            json.date,
            json.products.map((product: any) => ConsumedProduct.fromJSON(product)),
            new Macro(
                '',
                json.summary.kcal,
                json.summary.protein,
                json.summary.carbs,
                json.summary.fat,
            ),
            new Macro(
                '',
                json.user.kcal,
                json.user.protein,
                json.user.carbs,
                json.user.fat,
            )
        );
    }
}