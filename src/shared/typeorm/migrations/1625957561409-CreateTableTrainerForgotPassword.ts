import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableTrainerForgotPassword1625957561409
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tokenTrainer",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "trainer_id",
            type: "uuid",
          },
          {
            name: "token",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "trainer_Token_foreign",
            referencedTableName: "trainer",
            referencedColumnNames: ["id"],
            columnNames: ["trainer_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tokenTrainer");
  }
}
