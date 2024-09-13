import type {IProductRepository} from "@/feature/product/domain/repo/IProductRepository";
import {Product} from "@/feature/product/domain/entities/Product";


export class ProductService {
    constructor(private productRepository: IProductRepository) {
        this.productRepository = productRepository;
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.findAll();
    }
}