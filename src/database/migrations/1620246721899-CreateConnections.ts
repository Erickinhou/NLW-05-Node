import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from "typeorm";

export class CreateConnections1620246721899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "connections",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "admin_id", type: "uuid", isNullable: true },
          { name: "user_id", type: "uuid" },
          { name: "socket_id", type: "varchar" },
          { name: "updated_at", type: "timestamp", default: "now()" },
          { name: "created_at", type: "timestamp", default: "now()" }
        ]
      })
    );

    await queryRunner.createForeignKey(
      //this is a way to  create a foreign key outside the table
      "connections",
      new TableForeignKey({
        name: "FKUser",
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("connections", "FKUser"); //In this way I can drop the able easyly removing the fk first
    await queryRunner.dropTable("connections");
  }
}
