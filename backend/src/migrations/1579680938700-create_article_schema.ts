import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createArticleSchema1579680938700 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({
            name: 'articles',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                },
                {
                    name: 'author',
                    type: 'varchar',
                    isUnique: false,
                    length: '60',
                },
                {
                    name: 'document',
                    type: 'varchar',
                    isUnique: false,
                    length: '10000',
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '100',
                },
                {
                    name: 'created_at',
                    type: 'timestamptz',
                    default: 'NOW()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamptz',
                    default: 'NOW()',
                },
            ],
        });
        await queryRunner.createTable(table, true, false, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = new Table({ name: 'articles' });
        await queryRunner.dropTable(table);
    }
}
