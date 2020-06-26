import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class Keys1593134331241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'coverage',
      new TableForeignKey({
        name: 'CoverageKeyToUserInfo',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'plans',
      new TableForeignKey({
        name: 'PlansKeyToUserInfo',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('plans', 'PlansKeyToUserInfo');
    await queryRunner.dropForeignKey('coverage', 'CoverageKeyToUserInfo');
  }
}
