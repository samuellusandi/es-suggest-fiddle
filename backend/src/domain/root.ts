import { Module } from '@nestjs/common';
import { ArticleModule } from './article/modules/article.module';

@Module({
    imports: [ArticleModule],
})
export class RootGqlModules {}
