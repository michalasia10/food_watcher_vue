export class Token {
    constructor(
        public token: string,
        public userId: string
    ) {
    }

    static fromJSON(json: any): Token {
        return new Token(
            json.api_token,
            json.user_id,
        );
    }
}