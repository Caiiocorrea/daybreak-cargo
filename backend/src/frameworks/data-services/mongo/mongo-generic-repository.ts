import { IGenericRepository } from '../../../core';
import { Model } from 'mongoose';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  async getAll(page: number, limit: number, filter: any, user: any): Promise<T[]> {
    const regexFilter = {};
    let result: T[] = [];

    if (filter._id) {
      regexFilter['user_id'] = user.locals.user.user_id;
      regexFilter['_id'] = filter._id;
      result[0] = await this._repository
        .findById(filter._id, { created_at: false, updated_at: false, senha: false, __v: false })
        .populate(this._populateOnFind)
        .exec();
    }

    if (!filter._id) {
      for (const key in filter) {
        if (filter.hasOwnProperty(key)) {
          regexFilter[key] = new RegExp(filter[key], 'i');
          delete regexFilter['page'];
          delete regexFilter['limit'];
        }
      }
      result = await this._repository
        .find(regexFilter, { updated_at: false, senha: false, __v: false })
        .populate(this._populateOnFind)
        .sort({ 'created_at': -1, })
        .skip(Number(page) * Number(limit))
        .limit(Number(limit))
        .exec();
    }

    return result ?? [];
  }

  async getOne(email: string, senha: string): Promise<T> {
    return this._repository.findOne({ email, senha });
  }

  async getEmail(email: string): Promise<T> {
    return this._repository.findOne({ email }).exec();
  }

  count(): Promise<number> {
    return this._repository.count().exec();
  }


  get(query: any, user: any): Promise<any> {
    const regex = new RegExp(query.search, 'i')
    const date = {
      $gte: query.date_one ? `${query.date_one} 00:00:00` : undefined,
      $lte: query.date_two ? `${query.date_two} 23:59:59` : undefined
    } ?? undefined

    return this._repository.find({
      $or: [
        { origem: regex },
        { status: regex },
        { destino: regex },
        { empresa: regex },
        { kmCorrida: regex },
        { bloquinho: regex },
        { valorCorrida: regex }
      ],
      user_id: user.user_id,
      date
    }).populate(this._populateOnFind).exec();
  }

  create(item: T): Promise<T> {
    return this._repository.create(item);
  }

  update(id: string, item: T): Promise<T> {
    return this._repository.findByIdAndUpdate(id, item).exec();
  }
}