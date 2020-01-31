import { Client } from '@elastic/elasticsearch';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Repository } from 'typeorm';

import { ESSearchService } from '../../../core/es/services/es.service';
import { ARTICLES_INDEX, SUBSCRIPTIONS_ARTICLE_CREATED } from '../constants';
import { Article } from '../entities/article.entity';
import { verifyContent } from '../helpers/verifier';

@Injectable()
export class CreateArticleService {
    private esClient: Client;

    public constructor(
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        @Inject('PUB_SUB') private readonly pubSub: RedisPubSub,
        esService: ESSearchService,
    ) {
        this.esClient = esService.getClient();
    }

    public async createArticle(title: string, author: string, document: string): Promise<Article> {
        if (!verifyContent(title, author, document)) {
            throw new Error('Content does not meet criteria.');
        }
        const article = await this.articleRepository.save({author, title, document});
        await this.esClient.index({
            body: {
                author: article.author,
                createdAt: article.createdAt,
                document: article.document,
                id: article.id,
                title: article.title,
                titleCompletion: [article.title, ...article.title.split(/\s+/)],
                updatedAt: article.updatedAt,
            },
            index: ARTICLES_INDEX,
        });
        await this.esClient.indices.refresh({ index: ARTICLES_INDEX });
        await this.pubSub.publish(SUBSCRIPTIONS_ARTICLE_CREATED, {
            articleCreated: article,
        });
        return article;
    }
}
