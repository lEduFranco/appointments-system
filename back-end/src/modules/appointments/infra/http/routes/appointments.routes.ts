import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import checkRole from '@modules/users/infra/http/middlewares/checkRole';

import AppointmentsController from '../controllers/AppointmentsController';
import DeleteAllAppointmentsController from '../controllers/DeleteAllAppointmentsController';
import DeleteAllFutureAppointmentsController from '../controllers/DeleteAllFutureAppointmentsController';
import ReportsAppointmentsClientController from '../controllers/ReportsAppointmentsClientController';
import ReportsAppointmentsProviderController from '../controllers/ReportsAppointmentsProviderController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const reportsAppointmentsClientController = new ReportsAppointmentsClientController();
const reportsAppointmentsProviderController = new ReportsAppointmentsProviderController();
const deleteAllAppointmentsController = new DeleteAllAppointmentsController();
const deleteAllFutureAppointmentsController = new DeleteAllFutureAppointmentsController();

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

appointmentsRouter.get(
  '/reports-clients',
  checkRole(['admin', 'secretary']),
  reportsAppointmentsClientController.index,
);

appointmentsRouter.get(
  '/reports-providers',
  checkRole(['admin', 'secretary', 'rh']),
  reportsAppointmentsProviderController.index,
);

appointmentsRouter.delete(
  '/',
  checkRole(['admin', 'secretary']),
  appointmentsController.delete,
);

appointmentsRouter.delete(
  '/all-appointments',
  checkRole(['admin', 'secretary']),
  deleteAllAppointmentsController.delete,
);

appointmentsRouter.delete(
  '/allfuture-appointments',
  checkRole(['admin', 'secretary']),
  deleteAllFutureAppointmentsController.delete,
);

export default appointmentsRouter;
