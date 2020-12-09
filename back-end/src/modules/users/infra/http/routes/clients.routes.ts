import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import checkRole from '@modules/users/infra/http/middlewares/checkRole';

import ClientsController from '../controllers/ClientsController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const clientsRouter = Router();

const clientsController = new ClientsController();

clientsRouter.use(ensureAuthenticated);

clientsRouter.post(
  '/',
  checkRole(['admin', 'rh', 'secretary']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      role: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      rg: Joi.string(),
      cpf: Joi.string().required(),
      cnpj: Joi.string(),
      tel: Joi.string().required(),
      cel: Joi.string().required(),
      city: Joi.string().required(),
      zip_code: Joi.string().required(),
      neighborhood: Joi.string().required(),
      number: Joi.string().required(),
      address: Joi.string().required(),
      cf_df: Joi.string(),
      profession: Joi.string(),
      condominium_name: Joi.string(),
      reference_points: Joi.string(),
      nearest_subway_station: Joi.string(),
      company_responsible: Joi.string(),
    },
  }),
  clientsController.create,
);

clientsRouter.get(
  '/',
  checkRole(['admin', 'secretary']),
  ensureAuthenticated,
  clientsController.index,
);

export default clientsRouter;
