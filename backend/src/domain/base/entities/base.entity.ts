import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseModel {
    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
    })
    public createdAt: Date;

    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
    })
    public updatedAt: Date;

    public without(attributes: string[]): BaseModel {
        const object = { ...this };
        attributes.forEach((attribute: string) => {
            delete(object[attribute]);
        });
        return object;
    }
}
