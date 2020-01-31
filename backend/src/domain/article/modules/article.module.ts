import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PubsubProvider } from 'src/core/pubsub';

import { Article } from '../entities/article.entity';
import { ArticleMutationResolver } from '../resolvers/article.mutation.resolver';
import { ArticleQueryResolver } from '../resolvers/article.query.resolver';
import { ArticleSubscriptionResolver } from '../resolvers/article.subscription.resolver';
import { CreateArticleService } from '../services/article.create.service';
import { DeleteArticleService } from '../services/article.delete.service';
import { ParseArticleService } from '../services/article.parse.service';
import { ReadArticleService } from '../services/article.read.service';
import { SearchArticleService } from '../services/article.search.service';
import { UpdateArticleService } from '../services/article.update.service';

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    providers: [
        ArticleMutationResolver,
        ArticleQueryResolver,
        ArticleSubscriptionResolver,
        CreateArticleService,
        DeleteArticleService,
        ReadArticleService,
        ParseArticleService,
        SearchArticleService,
        UpdateArticleService,
        PubsubProvider,
    ],
})
export class ArticleModule {}
