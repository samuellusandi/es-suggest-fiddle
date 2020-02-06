// tslint:disable: object-literal-sort-keys for configuration files
import { configs } from './config';

import { RedisOptions } from 'ioredis';

export const redisConfig: RedisOptions = {
    host: configs.REDIS_HOST,
    port: +configs.REDIS_PORT,
    password: configs.REDIS_PASSWORD,
};
