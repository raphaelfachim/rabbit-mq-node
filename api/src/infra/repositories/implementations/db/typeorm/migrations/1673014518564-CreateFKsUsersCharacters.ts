import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class CreateFKsUsersCharacters1673014518564 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

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
        queryRunner.dropForeignKey(
            "users",
            "FK_USERS_CHARACTERS"
        );

        queryRunner.dropForeignKey(
            "characters",
            "FK_CHARACTERS_USERS"
        )
    }

}
