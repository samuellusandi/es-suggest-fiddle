import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { ESSearchService } from '../../../core/es/services/es.service';
import { ARTICLES_INDEX } from '../constants';
import { Article } from '../entities/article.entity';

@Injectable()
export class DeleteArticleService {
    private esClient: Client;

    public constructor(
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        esService: ESSearchService,
    ) {
        this.esClient = esService.getClient();
    }

    public async deleteArticle(id: string): Promise<DeleteResult> {
        this.esClient.deleteByQuery({
            body: {
                query: {
                    match: { id },
                },
            },
            index: ARTICLES_INDEX,
        });
        return this.articleRepository.delete({ id });
    }
}
