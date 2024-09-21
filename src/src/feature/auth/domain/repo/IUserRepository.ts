import {User} from '@/feature/auth/domain/entities/User';
import type {Token} from "@/feature/auth/domain/entities/Token";

export interface IUserRepository {
    findById(id: string): Promise<User | null>;

    findAll(): Promise<User[]>;

    save(user: User): Promise<void>;

    login(user: User): Promise<Token | null>

}

