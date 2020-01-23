import { Args, Query, Resolver } from '@nestjs/graphql';

import { WithSearchMeta } from '../../../core/helpers/search.meta';
import { Article } from '../entities/article.entity';
import { ReadArticleService } from '../services/article.read.service';
import { SearchArticleService } from '../services/article.search.service';

@Resolver('Article')
export class ArticleQueryResolver {
    public constructor(
        private readArticleService: ReadArticleService,
        private searchArticleService: SearchArticleService,
    ) {}

    @Query((_) => Article)
    public async readArticleById(@Args('id') id: string): Promise<Article | null> {
        return this.readArticleService.readOneById(id);
    }

    @Query()
    public async readManyArticles(@Args('limit') limit?: number): Promise<Article[]> {
        return this.readArticleService.readMany(limit);
    }

    @Query()
    public async searchArticle(@Args('title') title: string): Promise<WithSearchMeta<Article>> {
        return this.searchArticleService.searchArticleByTitle(title);
    }
}
