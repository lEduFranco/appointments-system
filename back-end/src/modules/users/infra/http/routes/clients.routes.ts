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
  checkRole(['admin', 'secretary']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      role: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),

      rg: Joi.string().allow(null, ''),
      cpf: Joi.string().required(),
      tel: Joi.string().allow(null, ''),
      cel: Joi.string().required(),
      profession: Joi.string(),

      uf: Joi.string().required(),
      city: Joi.string().required(),
      zip_code: Joi.string().required(),
      neighborhood: Joi.string().required(),
      number: Joi.string().required(),
      address: Joi.string().required(),
      condominium_name: Joi.string().allow(null, ''),
      reference_points: Joi.string().allow(null, ''),
      nearest_subway_station: Joi.string().allow(null, ''),

      cnpj: Joi.string().allow(null, ''),
      cf_df: Joi.string().allow(null, ''),
      company_responsible: Joi.string().allow(null, ''),
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
