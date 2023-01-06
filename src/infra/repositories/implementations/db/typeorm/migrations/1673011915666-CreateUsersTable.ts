import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateUsersTable1673011915666 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users", true, true, true);

        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar(100)",
                        isNullable: false
                    },
                    {
                        name: "age",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "registration",
                        type: "varchar(30)",
                        isNullable: false
                    },
                    {
                        name: "characters_id",
                        type: "int",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        isNullable: false
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users", true, true, true);
    }

}
