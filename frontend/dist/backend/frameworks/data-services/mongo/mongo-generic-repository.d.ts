import { IGenericRepository } from '../../../core';
import { Model } from 'mongoose';
export declare class MongoGenericRepository<T> implements IGenericRepository<T> {
    private _repository;
    private _populateOnFind;
    constructor(repository: Model<T>, populateOnFind?: string[]);
    getAll(page: number, limit: number, filter: any, user: any): Promise<T[]>;
    getOne(email: string, senha: string): Promise<T>;
    getEmail(email: string): Promise<T>;
    count(): Promise<number>;
    get(query: any, user: any): Promise<any>;
    create(item: T): Promise<T>;
    update(id: string, item: T): Promise<T>;
}
