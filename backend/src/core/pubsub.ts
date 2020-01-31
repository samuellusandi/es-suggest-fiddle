import { redisConfig } from './configs/redis';

import { RedisPubSub } from 'graphql-redis-subscriptions';
import * as Redis from 'ioredis';

export const PubsubProvider: any = {
    provide: 'PUB_SUB',
    useValue: new RedisPubSub({
        publisher: new Redis(redisConfig),
        subscriber: new Redis(redisConfig),
    }),
};
