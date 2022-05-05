import { AfterInsert, MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsersTokens1651634389117 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({

            name: "users_tokens",
            columns: [
                {
                    name: "id",
                    type: "int",
                    generationStrategy: "increment",
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: "user_id",
                    type: "int",
                },
                {
                    name: "token",
                    type: "varchar",
                    isGenerated: true,
                    generationStrategy: "uuid"
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
                }

            ],
            foreignKeys: [
                {

                    name: "TokenUser",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["user_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",

                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_tokens");
    }

}
