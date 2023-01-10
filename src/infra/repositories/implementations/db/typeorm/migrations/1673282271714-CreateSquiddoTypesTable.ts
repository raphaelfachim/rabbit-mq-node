import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateSquiddoTypesTable1673282271714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("squiddo_type", true);

        await queryRunner.createTable(
            new Table(
                {
                    name: "squiddo_type",
                    columns: [
                        {
                            name: "id",
                            type: "int",
                            isNullable: false,
                            isGenerated: true,
                        },
                        {
                            name: "name",
                            type: "varchar(30)"
                        }
                    ]
                }
            )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("squiddo_type", true);
    }

}
