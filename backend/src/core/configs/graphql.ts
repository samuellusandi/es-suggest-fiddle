// tslint:disable: object-literal-sort-keys for configuration files
import { join } from 'path';

import { GqlModuleOptions } from '@nestjs/graphql';

import { internalFormatError } from '../exceptions/base.exception';
import { configs } from './config';

export const gqlConfig: GqlModuleOptions = {
    debug: configs.NODE_ENV === 'development',
    definitions: {
        path: join(process.cwd(), 'src/schema/schema.d.ts'),
    },
    installSubscriptionHandlers: true,
    playground: configs.NODE_ENV === 'development',
    typePaths: ['./src/domain/**/*.graphql'],

    context: ({ req }) => ({ req }),
    formatError: (err) => internalFormatError(err),
};
