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
      provider_id: Joi.string().uuid().required(),
      user_id: Joi.string().uuid().required(),
      period: Joi.string().required(),
      frequency: Joi.string().required(),
      day: Joi.number().required(),
      month: Joi.number().required(),
      year: Joi.number().required(),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get(
  '/',
  checkRole(['admin', 'provider', 'secretary']),
  providerAppointmentsController.index,
);

appointmentsRouter.get(
  '/show',
  checkRole(['admin', 'provider', 'secretary']),
  appointmentsController.show,
);

appointmentsRouter.delete(
  '/',
  checkRole(['admin', 'secretary']),
  appointmentsController.delete,
);

export default appointmentsRouter;
