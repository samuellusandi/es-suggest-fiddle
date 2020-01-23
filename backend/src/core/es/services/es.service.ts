import { Injectable } from '@nestjs/common';

import { Client } from '@elastic/elasticsearch';
import { configs } from 'src/core/configs/config';

@Injectable()
export class ESSearchService {
    private client: Client;

    public constructor() {
        this.client = new Client({
            node: configs.ES_NODE,
        });
    }

    public getClient(): Client {
        return this.client;
    }
}
