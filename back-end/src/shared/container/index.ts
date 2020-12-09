import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserProfilesRepository from '@modules/users/repositories/IUserProfilesRepository';
import UserProfilesRepository from '@modules/users/infra/typeorm/repositories/UserProfilesRepository';

import IAddressRepository from '@modules/users/repositories/IAddressRepository';
import AddressesRepository from '@modules/users/infra/typeorm/repositories/AddressesRepository';

import IClientRepository from '@modules/users/repositories/IClientRepository';
import ClientsRepository from '@modules/users/infra/typeorm/repositories/ClientsRepository';

import IProviderRepository from '@modules/users/repositories/IProviderRepository';
import ProvidersRepository from '@modules/users/infra/typeorm/repositories/ProvidersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserProfilesRepository>(
  'UserProfilesRepository',
  UserProfilesRepository,
);

container.registerSingleton<IAddressRepository>(
  'AddressesRepository',
  AddressesRepository,
);

container.registerSingleton<IClientRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<IProviderRepository>(
  'ProvidersRepository',
  ProvidersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);
