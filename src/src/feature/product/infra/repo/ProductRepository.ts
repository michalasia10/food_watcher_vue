import {Product} from "@/feature/product/domain/entities/Product";
import {type IProductRepository} from "@/feature/product/domain/repo/IProductRepository";
import {Axios} from 'axios';

export class ProductRepository implements IProductRepository {
    private endpoint = 'products/'

    constructor(public axiosObject: Axios) {
    }

    async findById(id: string): Promise<Product | null> {
        try {
            const response = await this.axiosObject.get(`${this.endpoint}/${id}`);
            return Product.fromJSON(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    }

    async findAll(): Promise<Product[]> {
        try {
            const response = await this.axiosObject.get(this.endpoint);
            return response.data.map((product: any) => Product.fromJSON(product));
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    async save(product: Product): Promise<void> {
        try {
            await this.axiosObject.post(this.endpoint, {json: product});
        } catch (error) {
            console.error('Error saving product:', error);
        }
    }
}