import IORedis, { Redis as RedisClient } from 'ioredis';

import configRedis from '@src/config/redis';

export default class Redis {
  protected prefix?: string;
  protected client: RedisClient;

  constructor(options?: IORedis.RedisOptions) {
    this.prefix = options?.keyPrefix ?? configRedis?.keyPrefix ?? '';

    if (!this.prefix.endsWith(':')) {
      this.prefix = `${this.prefix}:`;
    }

    this.client = new IORedis({ ...configRedis, ...options, keyPrefix: this.prefix });
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

  public getClient(): RedisClient {
    return this.client;
  }

  async exists(key: IORedis.KeyType): Promise<number> {
    return this.client.exists(key);
  }

  delete(key: IORedis.KeyType): Promise<number> {
    return this.client.del(key);
  }

  async deletePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${this.prefix}${prefix}*`);

    await Promise.all(keys.map(key => this.delete(key.replace(`${this.prefix}`, ''))));
  }
}
