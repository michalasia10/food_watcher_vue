import type {IProductRepository} from "@/feature/product/domain/repo/IProductRepository";
import {Product} from "@/feature/product/domain/entities/Product";


export class ProductService {
    constructor(private productRepository: IProductRepository) {
        this.productRepository = productRepository;
    }

    async findAll(page: number, limit: number, queryString: string = ''): Promise<Product[]> {
        return await this.productRepository.findAll(page, limit, queryString);
    }
}