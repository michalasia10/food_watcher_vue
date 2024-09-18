import Entity from "@/core/domain/Entity";

export class Product extends Entity<Product> {
    constructor(
        id: string | undefined,
        public name: string,
        public email: string,
    ) {
        super(id);
    }


    static fromJSON(json: any): Product {
        return new Product(
            json.id,
            json.name,
            json.email,
        );
    }
}