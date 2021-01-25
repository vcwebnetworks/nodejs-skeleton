import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1587882620558 implements MigrationInterface {
  private table = 'users';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.table,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'UUID()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '150',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '150',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'NOW()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'NOW()',
          },
        ],
        indices: [
          { columnNames: ['name', 'created_at', 'updated_at'] },
          {
            columnNames: ['email'],
            isUnique: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
