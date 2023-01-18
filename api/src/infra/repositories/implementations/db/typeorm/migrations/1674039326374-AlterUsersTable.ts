import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class AlterUsersTable1674039326374 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // drop foreign keys
        await queryRunner.dropForeignKey('users', 'FK_USERS_CHARACTERS')
        await queryRunner.dropForeignKey('characters', 'FK_CHARACTERS_USERS')

        // clear tables
        await queryRunner.clearTable('characters');
        await queryRunner.clearTable('users');


        // drop old table
        await queryRunner.dropTable('users');

        // create new table
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar(100)",
                        isNullable: false
                    },
                    {
                        name: "email",
                        type: "varchar(100)",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'password',
                        type: "varchar(255)",
                        isNullable: false
                    },
                    {
                        name: "birth_date",
                        type: "date",
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

        // create new fks
        await queryRunner.createForeignKey(
            "users",
            new TableForeignKey({
                name: "FK_USERS_CHARACTERS",
                columnNames: ["characters_id"],
                referencedTableName: "characters",
                referencedColumnNames: ["id"],
            })
        )

        await queryRunner.createForeignKey(
            "characters",
            new TableForeignKey({
                name: "FK_CHARACTERS_USERS",
                columnNames: ["users_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
