import * as sanitize from 'sanitize-html';

import { Injectable } from '@nestjs/common';

import { allowCleanTagsRule, noHtmlRule } from '../../../core/helpers/sanitize_rules';
import { Article } from '../entities/article.entity';
import { TitleSearchUtility } from '../entities/search_utility';

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

    public parseArticlesFromESCompletionField(body: any): TitleSearchUtility[] {
        const content = body.suggest.title_suggest[0].options;
        const articles = [];
        content.forEach((item: any) => {
            articles.push({
                id: item._source.id,
                title: item._source.title,
            });
        });
        return articles;
    }

    public parseSuggestionsFromESBody(body: any, original: string): string | null {
        const suggestion = original.split(' ');
        const suggests = body.suggest.suggest_title;

        let hasSuggestions = false;
        suggests.forEach((suggest: any, index: number) => {
            if (suggest.options.length) {
                suggestion[index] = suggest
                    .options[0]
                    .text;
                hasSuggestions = true;
            }
        });

        return hasSuggestions ? suggestion.join(' ') : null;
    }

    private transformToArticle(hitContent: any): Article {
        const article: Article = new Article();
        article.author = sanitize(hitContent.author, noHtmlRule);
        article.createdAt = hitContent.createdAt;
        article.document = sanitize(hitContent.document, allowCleanTagsRule);
        article.id = hitContent.id;
        article.title = sanitize(hitContent.title, noHtmlRule);
        article.updatedAt = hitContent.updatedAt;
        return article;
    }
}
