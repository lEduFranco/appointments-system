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
      role: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),

      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      rg: Joi.string().allow(null, ''),
      cpf: Joi.string().required(),
      tel: Joi.string().allow(null, ''),
      cel: Joi.string().required(),
      birth_date: Joi.string().required(),
      occuppation: Joi.string().allow(null, ''),

      uf: Joi.string().allow(null, ''),
      city: Joi.string().allow(null, ''),
      zip_code: Joi.string().allow(null, ''),
      neighborhood: Joi.string().allow(null, ''),
      number: Joi.string().allow(null, ''),
      address: Joi.string().allow(null, ''),
      complement: Joi.string().allow(null, ''),
      reference_points: Joi.string().allow(null, ''),
      nearest_subway_station: Joi.string().allow(null, ''),
      localization: Joi.string().allow(null, ''),

      cnpj: Joi.string().allow(null, ''),
      cf_df: Joi.string().allow(null, ''),
      company_responsible: Joi.string().allow(null, ''),

      status: Joi.string().default('active'),
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

clientsRouter.get(
  '/show-clients',
  checkRole(['admin', 'secretary']),
  ensureAuthenticated,
  clientsController.show,
);

clientsRouter.put(
  '/update-client',
  checkRole(['admin', 'secretary']),
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      userProfile: {
        id: Joi.string().allow(null, ''),
        firstname: Joi.string().allow(null, ''),
        lastname: Joi.string().allow(null, ''),
        rg: Joi.string().allow(null, ''),
        cpf: Joi.string().allow(null, ''),
        cnpj: Joi.string().allow(null, ''),
        tel: Joi.string().allow(null, ''),
        cel: Joi.string().allow(null, ''),
        birth_date: Joi.string().allow(null, ''),
      },
      address: {
        id: Joi.string().allow(null, ''),
        uf: Joi.string().allow(null, ''),
        city: Joi.string().allow(null, ''),
        zip_code: Joi.string().allow(null, ''),
        neighborhood: Joi.string().allow(null, ''),
        number: Joi.string().allow(null, ''),
        address: Joi.string().allow(null, ''),
        complement: Joi.string().allow(null, ''),
        reference_points: Joi.string().allow(null, ''),
        nearest_subway_station: Joi.string().allow(null, ''),
        localization: Joi.string().allow(null, ''),
      },
      clients: {
        id: Joi.string().allow(null, ''),
        cf_df: Joi.string().allow(null, ''),
        company_responsible: Joi.string().allow(null, ''),
        occuppation: Joi.string().allow(null, ''),
        status: Joi.string(),
      },
    },
  }),
  clientsController.update,
);

export default clientsRouter;
