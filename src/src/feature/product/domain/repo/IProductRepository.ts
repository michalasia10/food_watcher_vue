import {Product} from '@/feature/product/domain/entities/Product';

export interface IProductRepository {
    findById(id: string): Promise<Product | null>;

    findAll(): Promise<Product[]>;

    save(product: any): Promise<void>;

}

