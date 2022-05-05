import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateProducts1651532612393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "products",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: 1
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "price",
                    type: "decimal",
                    precision: 10,
                    scale: 2
                },
                {
                    name: "quantity",
                    type: "int"
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: "now()"
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: "now()"
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("products")
    }

}
