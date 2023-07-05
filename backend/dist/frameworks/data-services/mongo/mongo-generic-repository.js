"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoGenericRepository = void 0;
class MongoGenericRepository {
    constructor(repository, populateOnFind = []) {
        this._repository = repository;
        this._populateOnFind = populateOnFind;
    }
    async getAll(page, limit, filter, user) {
        const regexFilter = {};
        let result = [];
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
        return result !== null && result !== void 0 ? result : [];
    }
    async getOne(email, senha) {
        return this._repository.findOne({ email, senha });
    }
    async getEmail(email) {
        return this._repository.findOne({ email }).exec();
    }
    count() {
        return this._repository.count().exec();
    }
    get(query, user) {
        var _a;
        const regex = new RegExp(query.search, 'i');
        const date = (_a = {
            $gte: query.date_one ? `${query.date_one} 00:00:00` : undefined,
            $lte: query.date_two ? `${query.date_two} 23:59:59` : undefined
        }) !== null && _a !== void 0 ? _a : undefined;
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
    create(item) {
        return this._repository.create(item);
    }
    update(id, item) {
        return this._repository.findByIdAndUpdate(id, item).exec();
    }
}
exports.MongoGenericRepository = MongoGenericRepository;
//# sourceMappingURL=mongo-generic-repository.js.map