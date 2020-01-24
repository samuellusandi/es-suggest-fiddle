import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ESSearchService } from '../../../core/es/services/es.service';
import { ARTICLES_INDEX } from '../constants';
import { Article } from '../entities/article.entity';

@Injectable()
export class UpdateArticleService {
    private esClient: Client;

    public constructor(
        @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
        esService: ESSearchService,
    ) {
        this.esClient = esService.getClient();
    }

    public async updateArticle(
        id: string,
        title?: string,
        author?: string,
        document?: string,
    ): Promise<Article> {
        const article = await this.articleRepository.findOne({ id });
        if (!article) {
            throw new Error(`Article with id ${id} not found.`);
        }

        let changed = true;
        const script = [];
        if (title) {
            article.title = title;
            script.push(`ctx._source.title='${title}'`);
            script.push(`ctx._source.titleCompletion='${title.split(/\s+/)}'`);
            changed = true;
        }
        if (author) {
            script.push(`ctx._source.author='${author}'`);
            article.author = author;
            changed = true;
        }
        if (document) {
            script.push(`ctx._source.document='${document}'`);
            article.document = document;
            changed = true;
        }

        if (changed) {
            this.esClient.updateByQuery({
                body: {
                    query: {
                        match: { id },
                    },
                    script: script.join(';'),
                },
                index: ARTICLES_INDEX,
            });
            return this.articleRepository.save(article);
        }
        return Promise.resolve(article);
    }
}
