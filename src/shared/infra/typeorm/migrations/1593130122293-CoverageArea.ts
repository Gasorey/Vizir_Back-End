import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CoverageArea1593130122293 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'coverage',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'origin',
            type: 'integer',
          },
          {
            name: 'destination',
            type: 'integer',
          },
          {
            name: 'price',
            type: 'numeric',
            scale: 2,
            precision: 10,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('coverage');
  }
}
