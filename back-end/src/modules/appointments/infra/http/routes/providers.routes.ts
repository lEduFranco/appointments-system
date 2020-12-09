import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import checkRole from '@modules/users/infra/http/middlewares/checkRole';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get(
  '/',
  checkRole(['admin', 'secretary']),
  providersController.index,
);
providersRouter.get(
  '/:provider_id/month-availability',
  checkRole(['admin', 'secretary', 'provider']),
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerMonthAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  checkRole(['admin', 'secretary', 'provider']),
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerDayAvailabilityController.index,
);

providersRouter.post(
  '/',
  checkRole(['admin', 'rh', 'secretary']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      role: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      rg: Joi.string().required(),
      cpf: Joi.string().required(),
      cnpj: Joi.string().required(),
      tel: Joi.string().required(),
      cel: Joi.string().required(),
      city: Joi.string().required(),
      zip_code: Joi.string().required(),
      neighborhood: Joi.string().required(),
      number: Joi.string().required(),
      address: Joi.string().required(),
      begin_date: Joi.string().required(),
      final_date: Joi.string().required(),
      demission_reason: Joi.string().required(),
      uniform_size: Joi.string().required(),
      voter_registration: Joi.string().required(),
      voting_zone: Joi.string().required(),
      voting_section: Joi.string().required(),
      password_mei: Joi.string().required(),
    },
  }),
  providersController.create,
);

export default providersRouter;
