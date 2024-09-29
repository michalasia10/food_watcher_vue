export class Meal {
    constructor(
        public date: Date,
        public productId: string,
        public weightInGrams: number,
        public type: string
    ) {
    }

    toJSON() {
        return {
            date: this.date.toISOString(),
            product_id: this.productId,
            weight_in_grams: this.weightInGrams,
            type: this.type
        }
    }

}