import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { gqlConfig } from './configs/graphql';
import { typeOrmConfig } from './configs/typeorm';
import { ESModule } from './es/modules/es.module';

import { RootGqlModules } from '../domain/root';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        GraphQLModule.forRoot(gqlConfig),
        ESModule,
        RootGqlModules,
    ],
})
export class AppModule {}
