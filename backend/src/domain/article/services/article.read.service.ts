import { ApiResponse, Client } from '@elastic/elasticsearch';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ESSearchService } from '../../../core/es/services/es.service';
import { ARTICLES_INDEX } from '../constants';
import { Article } from '../entities/article.entity';
import { ParseArticleService } from './article.parse.service';

@Injectable()
export class ReadArticleService {
    private esClient: Client;

    public constructor(
        @InjectRepository(Article) private articleRepository: Repository<Article>,
        @Inject(forwardRef(() => ParseArticleService)) private readonly parseService: ParseArticleService,
        esService: ESSearchService,
    ) {
        this.esClient = esService.getClient();
    }

    public async readMany(limit?: number): Promise<Article[]> {
        limit = this.limitBetween(limit, 5, 20);
        const result: ApiResponse = await this.esClient.search({
            index: ARTICLES_INDEX,
            size: limit,
        });
        if (result.statusCode === 200) {
            return this.parseService.parseArticlesFromESBody(result.body);
        }
        return this.articleRepository.find({take: limit || 5});
    }

    public async readOneById(id: string): Promise<Article | null> {
        const result: ApiResponse = await this.esClient.search({
            body: {
                query: {
                    match: { id },
                },
            },
            index: ARTICLES_INDEX,
        });
        if (result.statusCode === 200) {
            const articles = this.parseService.parseArticlesFromESBody(result.body);
            return articles.length >= 1 ? articles[0] : null;
        }
        return this.articleRepository.findOne({id});
    }

    private limitBetween(value: number, lowerBound: number, upperBound: number): number {
        let result = value < lowerBound ? lowerBound : value;
        result = result > upperBound ? upperBound : result;
        return result;
    }
}
