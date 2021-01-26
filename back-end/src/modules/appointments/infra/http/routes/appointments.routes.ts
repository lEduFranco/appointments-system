import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import checkRole from '@modules/users/infra/http/middlewares/checkRole';

import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
  '/',
  checkRole(['admin', 'secretary']),
  celebrate({
    [Segments.BODY]: {
      day: Joi.number().required(),
      month: Joi.number().required(),
      year: Joi.number().required(),
      client_id: Joi.string().required(),
      provider_id: Joi.string().required(),
      period: Joi.string().required(),
      frequency: Joi.string().required(),
      observation: Joi.string().allow(null, ''),

      uf: Joi.string().required(),
      city: Joi.string().required(),
      zip_code: Joi.string().required(),
      neighborhood: Joi.string().required(),
      number: Joi.string().required(),
      address: Joi.string().required(),
      reference_points: Joi.string().required(),
      nearest_subway_station: Joi.string().required(),
      complement: Joi.string().allow(null, ''),

      status: Joi.string().default('created'),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get(
  '/',
  checkRole(['admin', 'provider', 'secretary']),
  providerAppointmentsController.index,
);

appointmentsRouter.delete(
  '/',
  checkRole(['admin', 'secretary']),
  appointmentsController.delete,
);

export default appointmentsRouter;
