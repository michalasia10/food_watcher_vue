export default abstract class Entity<T extends Entity<T>> {
    protected constructor(
        public id: string
    ) {}

    static fromJSON(json: any): Entity<any>{
        throw new Error('missing impl')
    }
}