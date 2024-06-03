import { AnyKeys, FilterQuery, Model, ProjectionType, QueryOptions, UpdateQuery, UpdateWriteOpResult } from 'mongoose';

export default abstract class BaseRepository<T> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(payload: T | AnyKeys<T>): Promise<T> {
    const result = await this.model.create(payload);
    return result;
  }

  // READ
  async findById(id: string, projection: ProjectionType<T> = {}, populate: any = null): Promise<any> {
    const result = populate ? await this.model.findById(id, projection).populate(populate) : await this.model.findById(id, projection);
    return result;
  }

  async findOne(filter: FilterQuery<T>, projection: ProjectionType<T> = {}, populate: any = null): Promise<T | null> {
    const result = populate ? await this.model.findOne(filter, projection) : await this.model.findOne(filter, projection);
    return result;
  }

  async find(filter: FilterQuery<T>, projection: ProjectionType<T> = {}, limit: number = 10, skip: number = 0): Promise<T[]> {
    const results = await this.model.find(filter, projection).skip(skip).limit(limit);
    return results.map((result) => result.toObject());
  }

  // UPDATE
  async findByIdAndUpdate(id: string, payload: UpdateQuery<T>, options: QueryOptions<T> | null | undefined = {}): Promise<T | null> {
    const result = await this.model.findByIdAndUpdate({ _id: id }, payload, options);
    return result;
  }
  async findOneAndUpdate(filter: FilterQuery<T>, payload: UpdateQuery<T>, options: QueryOptions<T> | null | undefined = {}): Promise<T | null> {
    const result = await this.model.findOneAndUpdate(filter, payload, options);
    return result ? result.toObject() : null;
  }

  async updateMany(filter: FilterQuery<T>, payload: UpdateQuery<T>): Promise<UpdateWriteOpResult | null> {
    const result = await this.model.updateMany(filter, payload);
    return result;
  }

  // DELETE
  async deleteById(id: string): Promise<T | null> {
    const result = await this.model.findByIdAndDelete(id);
    return result;
  }
}
