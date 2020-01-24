import { Injectable } from '@nestjs/common';
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

    public parseSuggestionsFromESBody(body: any, original: string): string[] {
        const suggests = body.suggest.suggest_title[0].options;
        // Split by whitespace, this is going to be our base of replacements.
        const suggestions = original.split(/\s+/);
        suggests.slice()
            .reverse()
            .forEach((suggestion: any) => {
                const highlightedOptions = suggestion.highlighted.split(/\s+/);
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < highlightedOptions.length; ++i) {
                    if (highlightedOptions[i].startsWith('[') &&
                        highlightedOptions[i].endsWith(']')) {
                        suggestions[i] = highlightedOptions[i].substring(
                            2,
                            highlightedOptions[i].length - 2,
                        );
                    }
                }
            });
        return [suggestions.join(' ')];
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
