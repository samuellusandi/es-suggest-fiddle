import { ClientOptions } from '@elastic/elasticsearch';
import { configs } from './config';

export const esConfig: ClientOptions = {
    auth: {
        password: configs.ES_PASSWORD,
        username: configs.ES_USERNAME,
    },
    node: configs.ES_NODE,
};
