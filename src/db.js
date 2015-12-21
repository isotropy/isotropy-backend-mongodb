/* @flow */
import promisify from 'nodefunc-promisify';
import MongoDb from "mongodb";
import Collection from "./collection";

const _collection = promisify(MongoDb.Db.prototype.collection);
const _dropDatabase = promisify(MongoDb.Db.prototype.dropDatabase);
const _close = promisify(MongoDb.Db.prototype.close);

class Db {
    underlying: MongoDb.Db;

    constructor(underlying: MongoDb.Db) {
        this.underlying = underlying;
    }

    async collection(name: string) : Promise<Collection> {
        const collection = await _collection.call(this.underlying, name);
        return new Collection(collection);
    }

    async dropDatabase() : Promise {
        await _dropDatabase.call(this.underlying);
    }

    async close() : Promise {
        await _close.call(this.underlying);
    }
}

export default Db;
