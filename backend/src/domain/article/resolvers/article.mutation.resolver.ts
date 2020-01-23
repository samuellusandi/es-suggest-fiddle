import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Article } from '../entities/article.entity';
import { CreateArticleService } from '../services/article.create.service';
import { DeleteArticleService } from '../services/article.delete.service';
import { UpdateArticleService } from '../services/article.update.service';

@Resolver('Article')
export class ArticleMutationResolver {
    public constructor(
        private readonly createArticleService: CreateArticleService,
        private readonly deleteArticleService: DeleteArticleService,
        private readonly updateArticleService: UpdateArticleService,
    ) {}

    @Mutation()
    public async createArticle(
        @Args('title') title: string,
        @Args('author') author: string,
        @Args('document') document: string,
    ): Promise<Article> {
        return this.createArticleService.createArticle(title, author, document);
    }

    @Mutation()
    public async deleteArticle(@Args('id') id: string): Promise<number> {
        const result = await this.deleteArticleService.deleteArticle(id);
        return result.affected;
    }

    @Mutation()
    public async updateArticle(
        @Args('id') id: string,
        @Args('title') title: string,
        @Args('author') author: string,
        @Args('document') document: string,
    ): Promise<Article> {
        return this.updateArticleService.updateArticle(id, title, author, document);
    }
}
