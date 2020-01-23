
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface Article {
    id: string;
    title: string;
    author: string;
    document: string;
    createdAt: string;
}

export interface ArticleSearchMeta {
    suggest: string[];
    count: number;
}

export interface ArticleSearchResult {
    content: Article[];
    meta: ArticleSearchMeta;
}

export interface IMutation {
    createArticle(title: string, author: string, document: string): Article | Promise<Article>;
    updateArticle(id: string, title?: string, author?: string, document?: string): Article | Promise<Article>;
    deleteArticle(id: string): number | Promise<number>;
}

export interface IQuery {
    readManyArticles(limit?: number): Article[] | Promise<Article[]>;
    readArticleById(id?: string): Article | Promise<Article>;
    searchArticle(title: string): ArticleSearchResult | Promise<ArticleSearchResult>;
}
