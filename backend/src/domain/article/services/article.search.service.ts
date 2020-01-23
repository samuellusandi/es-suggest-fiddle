import { ApiResponse, Client } from '@elastic/elasticsearch';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ESSearchService } from '../../../core/es/services/es.service';
import { WithSearchMeta } from '../../../core/helpers/search.meta';
import { Article } from '../entities/article.entity';
import { ParseArticleService } from './article.parse.service';

@Injectable()
export class SearchArticleService {
    private esClient: Client;

    public constructor(
        @InjectRepository(Article) private articleRepository: Repository<Article>,
        @Inject(forwardRef(() => ParseArticleService)) private readonly parseService: ParseArticleService,
        esService: ESSearchService,
    ) {
        this.esClient = esService.getClient();
    }

    public async searchArticleByTitle(title: string): Promise<WithSearchMeta<Article>> {
        const result: ApiResponse = await this.esClient.search({
            body: {
                query: {
                    match: {
                        'title.raw': {
                            operator: 'and',
                            query: title,
                        },
                    },
                },
                suggest: {
                    suggest_title: {
                        phrase: {
                            confidence: 0.9,
                            field: 'title',
                            gram_size: 3,
                            highlight: {
                                post_tag: '</b>',
                                pre_tag: '<b>',
                            },
                            max_errors: 0.5,
                            real_word_error_likelihood: 0.95,
                        },
                    },
                    text: title,
                },
            },
        });
        // TODO: Search Article By Title + Parse Suggest
        return {
            content: [],
            meta: {
                count: 0,
                suggest: [],
            },
        };
    }
}
