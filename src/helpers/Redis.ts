import IORedis, { Redis as RedisClient } from 'ioredis';

import configRedis from '@src/config/redis';

export default class Redis {
  protected prefix?: string;
  protected client: RedisClient;

  constructor(options?: IORedis.RedisOptions) {
    this.prefix = options?.keyPrefix ?? '';
    this.client = new IORedis({ ...configRedis, ...options });
  }

  set(key: IORedis.KeyType, value: IORedis.ValueType, expired?: number | string): Promise<IORedis.Ok | null> {
    if (value) {
      value = JSON.stringify(value);
    }

    if (expired) {
      return this.client.set(key, value, 'EX', expired);
    }

    return this.client.set(key, value);
  }

  async get<T>(key: IORedis.KeyType): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }

  async exists(key: IORedis.KeyType): Promise<number> {
    return this.client.exists(key);
  }

  delete(key: IORedis.KeyType): Promise<number> {
    return this.client.del(key);
  }

  async deletePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${this.prefix}${prefix}:*`);
    const pipeline = this.client.pipeline();

    keys.forEach(key => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
