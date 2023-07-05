export declare abstract class IGenericRepository<T> {
    abstract getAll(page: number, limit: number, filter: any, user: any): Promise<T[]>;
    abstract get(query: any, user: any): Promise<T>;
    abstract count(): Promise<Number>;
    abstract getOne(email: string, senha: string): Promise<T>;
    abstract getEmail(email: string): Promise<T>;
    abstract create(item: T): Promise<T>;
    abstract update(id: string, item: T): Promise<T>;
}
