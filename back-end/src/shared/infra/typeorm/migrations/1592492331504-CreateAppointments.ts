import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1586994081011
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
          },
          {
            name: 'date',
            type: 'date',
          },
          {
            name: 'period',
            type: 'enum',
            enum: ['integral', 'part_time_morning', 'part_time_afternoon'],
          },
          {
            name: 'frequency',
            type: 'enum',
            enum: ['first_contact', 'weekly', 'biweekly', 'monthly'],
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
