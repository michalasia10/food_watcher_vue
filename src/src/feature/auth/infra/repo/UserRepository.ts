import {User} from "@/feature/auth/domain/entities/User";
import {type IUserRepository} from "@/feature/auth/domain/repo/IUserRepository";
import {Axios} from 'axios';
import {Token} from "@/feature/auth/domain/entities/Token";

export class UserRepository implements IUserRepository {
    private endpoint = 'users/'

    constructor(public axiosObject: Axios) {
    }

    async findById(id: string): Promise<User | null> {
        try {
            const response = await this.axiosObject.get(`${this.endpoint}/${id}`);
            return User.fromJSON(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    }

    async findAll(): Promise<User[]> {
        try {
            const response = await this.axiosObject.get(this.endpoint);
            return response.data.map((user: any) => User.fromJSON(user));
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    async save(user: User): Promise<void> {
        try {
            // Note: dummy values for settings, needs to be implemented
            await this.axiosObject.post(this.endpoint, {
                    ...user.toJson(),
                    settings: {
                        age: 0,
                        gender: "unspecified",
                        macro: {
                            proteins: 0,
                            fats: 0,
                            carbs: 0,
                            calories: 0
                        }
                    }
                }
            );
        } catch (error) {
            console.error('Error saving product:', error);
        }
    }

    async login(user: User): Promise<Token | null> {
        try {
            const response = (await this.axiosObject
                .post(`${this.endpoint}/login`, user.toJsonLogin()))
                .data

            return Token.fromJSON(response)
        } catch (error) {
            return null
        }
    }
}