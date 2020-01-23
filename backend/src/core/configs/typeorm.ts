// tslint:disable: object-literal-sort-keys for configuration files

import { DatabaseType } from 'typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { configs } from './config';

/**
 * Represents the config of the database. Since ConnectionOptions
 * is a union of multiple incompatible types, we're going to use
 * `any` here. It's not the best choice, but until a proper
 * implementation can be found, we're resorting to this.
 */
export const typeOrmConfig: any = {
    type: configs.DATABASE_TYPE as DatabaseType,
    host: configs.DATABASE_HOST,
    port: configs.DATABASE_PORT,
    username: configs.DATABASE_USERNAME,
    password: configs.DATABASE_PASSWORD,
    database: configs.DATABASE_DATABASE,

    synchronize: false,
    logging: configs.DATABASE_LOGGING as LoggerOptions,
    entities: [
        `${__dirname}/../../domain/**/entities/*.entity{.ts,.js}`,
    ],
};
