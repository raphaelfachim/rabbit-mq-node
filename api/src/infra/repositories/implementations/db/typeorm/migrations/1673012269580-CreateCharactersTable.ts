import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateCharactersTable1673012269580 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.dropTable("characters", true, true, true);

        await queryRunner.createTable(
            new Table({
                name: "characters",
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
                        type: "varchar(30)",
                        isNullable: false
                    },
                    {
                        name: "users_id",
                        type: "int",
                        isNullable: false,
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("characters", true, true, true);
    }

}
