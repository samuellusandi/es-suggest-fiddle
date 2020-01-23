import { Global, Module } from '@nestjs/common';

import { ESSearchService } from '../services/es.service';

@Global()
@Module({
    exports: [ESSearchService],
    providers: [
        {
            provide: ESSearchService,
            useValue: new ESSearchService(),
        },
    ],
})
export class ESModule {}
