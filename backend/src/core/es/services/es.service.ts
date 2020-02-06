import { Client } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';

import { esConfig } from 'src/core/configs/elasticsearch';

@Injectable()
export class ESSearchService {
    private client: Client;

    public constructor() {
        this.client = new Client(esConfig);
    }

    public getClient(): Client {
        return this.client;
    }
}
