import { Injectable } from '@nestjs/common';
import * as Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis.Redis;

  constructor() {
    this.redisClient = new Redis.default({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
    });
  }

  getClient(): Redis.Redis {
    return this.redisClient;
  }
}