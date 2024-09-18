import type {IUserRepository} from "@/feature/auth/domain/repo/IUserRepository";
import {User} from "@/feature/auth/domain/entities/User";
import {Token} from "@/feature/auth/domain/entities/Token";

export class UserService {
    constructor(private userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async login(username: string, password: string): Promise<Token | null> {
        return await this.userRepository.login(new User('', username, password, ''))
    }

    async save(username: string, password: string, email: string): Promise<void> {
        return await this.userRepository.save(new User('', username, password, email))
    }
}