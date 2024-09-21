import {Product} from '@/feature/product/domain/entities/Product';

export interface IProductRepository {
    findById(id: string): Promise<Product | null>;

    findAll(page: number, limit: number, queryString?: string): Promise<Product[]>;

    save(product: any): Promise<void>;

}

