import { Injectable } from '@nestjs/common';
import { Article } from '../entities/article.entity';

@Injectable()
export class ParseArticleService {
    public parseArticlesFromESBody(body: any): Article[] {
        const hits = body.hits.hits;
        const articles = [];
        hits.forEach((hit: any) => {
            const content = hit._source;
            const article: Article = this.transformToArticle(content);

            articles.push(article);
        });
        return articles;
    }

    private transformToArticle(hitContent: any): Article {
        const article: Article = new Article();
        article.author = hitContent.author;
        article.createdAt = hitContent.createdAt;
        article.document = hitContent.document;
        article.id = hitContent.id;
        article.title = hitContent.title;
        article.updatedAt = hitContent.updatedAt;
        return article;
    }
}
