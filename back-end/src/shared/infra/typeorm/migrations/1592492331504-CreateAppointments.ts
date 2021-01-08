import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

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
            name: 'initial_appointment_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'date',
          },
          {
            name: 'observation',
            type: 'varchar',
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
            name: 'provider_id',
            type: 'varchar',
          },
          {
            name: 'client_id',
            type: 'varchar',
          },
          {
            name: 'uf',
            type: 'varchar',
          },
          {
            name: 'zip_code',
            type: 'varchar',
          },
          {
            name: 'city',
            type: 'varchar',
          },
          {
            name: 'neighborhood',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'number',
            type: 'varchar',
          },
          {
            name: 'complement',
            type: 'varchar',
          },
          {
            name: 'reference_points',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nearest_subway_station',
            type: 'varchar',
            isNullable: true,
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

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentInitialAppointment',
        columnNames: ['initial_appointment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'appointments',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
