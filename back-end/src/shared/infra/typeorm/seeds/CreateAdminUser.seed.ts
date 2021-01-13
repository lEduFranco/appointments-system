import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../../../modules/users/infra/typeorm/entities/User';

export default class CreateAdminUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const password = await hash('123456', 8);
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          email: 'gerencia@tomaisvip.com',
          password,
          role: 'admin',
        },
      ])
      .execute();
  }
}
