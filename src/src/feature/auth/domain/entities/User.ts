import Entity from "@/core/domain/Entity";

export class User extends Entity<User> {
    constructor(
        id: string | undefined,
        public username: string,
        public password: string,
        public email: string,
    ) {
        super(id);
    }


    static fromJSON(json: any): User {
        return new User(
            json.id,
            json.username,
            json.password,
            json.email
        );
    }

    toJson() {
        return {
            username: this.username,
            password: this.password,
            email: this.email
        }
    }

    toJsonLogin() {
        return {
            username: this.username,
            password: this.password
        }
    }
}