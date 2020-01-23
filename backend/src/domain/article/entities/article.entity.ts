import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../base/entities/base.entity';

@Entity({ name: 'articles' })
export class Article extends BaseModel {
    @Column({ length: 60 })
    public author: string;
    @Column({ length: 10000 })
    public document: string;
    @Column({ length: 100 })
    public title: string;
}
