import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class Providers1607019820297 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'providers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'begin_date',
            type: 'date',
          },
          {
            name: 'final_date',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'demission_reason',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'uniform_amount',
            type: 'int',
          },
          {
            name: 'uniform_size',
            type: 'varchar',
          },
          {
            name: 'voter_registration',
            type: 'varchar',
          },
          {
            name: 'voting_zone',
            type: 'varchar',
          },
          {
            name: 'voting_section',
            type: 'varchar',
          },
          {
            name: 'password_mei',
            type: 'varchar',
          },
          {
            name: 'relatives_contacts',
            type: 'varchar',
          },
          {
            name: 'disc',
            type: 'enum',
            enum: ['dominante', 'influente', 'estabilidade', 'conformidade'],
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['active', 'inactive', 'suspended'],
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'providers',
      new TableForeignKey({
        name: 'ProviderUser',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('providers');
  }
}
