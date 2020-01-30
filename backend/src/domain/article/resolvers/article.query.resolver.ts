import { Args, Query, Resolver } from '@nestjs/graphql';

import { WithSearchMeta } from '../../../core/helpers/search.meta';
import { Article } from '../entities/article.entity';
import { TitleSearchUtility } from '../entities/search_utility';
import { ReadArticleService } from '../services/article.read.service';
import { SearchArticleService } from '../services/article.search.service';

@Resolver('Article')
export class ArticleQueryResolver {
    public constructor(
        private readArticleService: ReadArticleService,
        private searchArticleService: SearchArticleService,
    ) {}

    @Query()
    public async autoCompleteTitle(@Args('prefix') prefix: string): Promise<TitleSearchUtility[]> {
        return await this.searchArticleService.autocompleteTitle(prefix);
    }

    @Query((_) => Article)
    public async readArticleById(@Args('id') id: string): Promise<Article | null> {
        return await this.readArticleService.readOneById(id);
    }

    @Query()
    public async readManyArticles(
        @Args('offset') offset?: number,
        @Args('limit') limit?: number,
    ): Promise<Article[]> {
        return await this.readArticleService.readMany(offset, limit);
    }

    @Query()
    public async searchArticle(@Args('title') title: string): Promise<WithSearchMeta<Article>> {
        return await this.searchArticleService.searchArticleByTitle(title);
    }
}
