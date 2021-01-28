import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import checkRole from '@modules/users/infra/http/middlewares/checkRole';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

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

      status: Joi.string().default('created'),
    },
  }),
  appointmentsController.create,
);
appointmentsRouter.get(
  '/',
  checkRole(['admin', 'provider', 'secretary']),
  appointmentsController.index,
);

appointmentsRouter.delete(
  '/',
  checkRole(['admin', 'secretary']),
  appointmentsController.delete,
);

export default appointmentsRouter;
