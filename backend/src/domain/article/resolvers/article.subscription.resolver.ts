import { Inject } from '@nestjs/common';
import { Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { SUBSCRIPTIONS_ARTICLE_CREATED } from '../constants';

@Resolver('Article')
export class ArticleSubscriptionResolver {
    public constructor(
        @Inject('PUB_SUB') private readonly pubSub: RedisPubSub,
    ) {}

    @Subscription()
    public articleCreated() {
        return this.pubSub.asyncIterator(SUBSCRIPTIONS_ARTICLE_CREATED);
    }
}
