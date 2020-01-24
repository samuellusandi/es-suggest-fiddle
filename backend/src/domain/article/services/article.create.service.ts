import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ESSearchService } from '../../../core/es/services/es.service';
import { ARTICLES_INDEX } from '../constants';
import { Article } from '../entities/article.entity';

@Injectable()
export class CreateArticleService {
    private esClient: Client;

    private readonly MAX_AUTHOR_LENGTH = 60;
    private readonly MAX_DOCUMENT_LENGTH = 10000;
    private readonly MAX_TITLE_LENGTH = 100;

    private readonly MIN_DOCUMENT_LENGTH = 50;
    private readonly MIN_TITLE_LENGTH = 5;

    public constructor(
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        esService: ESSearchService,
    ) {
        this.esClient = esService.getClient();
    }

    public async createArticle(title: string, author: string, document: string): Promise<Article> {
        if (!this.verifyContent(title, author, document)) {
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
        return article;
    }

    private verifyContent(title: string, author: string, document: string): boolean {
        if (title.length < this.MIN_TITLE_LENGTH ||
            title.length > this.MAX_TITLE_LENGTH) {
            return false;
        }
        if (author.length < 1 ||
            author.length > this.MAX_AUTHOR_LENGTH) {
            return false;
        }
        return document.length >= this.MIN_DOCUMENT_LENGTH
            && document.length <= this.MAX_DOCUMENT_LENGTH;
    }
}
