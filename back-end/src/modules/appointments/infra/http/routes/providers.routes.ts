import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import checkRole from '@modules/users/infra/http/middlewares/checkRole';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import Providers2Controller from '../controllers/Providers2Controller';

const providersRouter = Router();
const providersController = new ProvidersController();
const providers2Controller = new Providers2Controller();

providersRouter.use(ensureAuthenticated);

providersRouter.get(
  '/',
  checkRole(['admin', 'secretary']),
  providersController.index,
);

providersRouter.post(
  '/',
  checkRole(['admin', 'rh']),
  celebrate({
    [Segments.BODY]: {
      role: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),

      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      rg: Joi.string().required(),
      cpf: Joi.string().required(),
      cnpj: Joi.string().required(),
      tel: Joi.string().required(),
      cel: Joi.string().required(),
      birth_date: Joi.string().required(),
      pix: Joi.string().required(),

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

      begin_date: Joi.string().required(),
      final_date: Joi.string().allow(null, ''),
      demission_reason: Joi.string().allow(null, ''),
      uniform_size: Joi.string().required(),
      voter_registration: Joi.string().required(),
      voting_zone: Joi.string().required(),
      voting_section: Joi.string().required(),
      password_mei: Joi.string().required(),

      status: Joi.string().default('active'),
      uniform_amount: Joi.string().required(),
      relatives_contacts: Joi.string().required(),
      disc: Joi.string().required(),
    },
  }),
  providersController.create,
);

providersRouter.get(
  '/search',
  checkRole(['admin', 'rh']),
  ensureAuthenticated,
  providers2Controller.index,
);

providersRouter.get(
  '/show-providers',
  checkRole(['admin', 'rh']),
  ensureAuthenticated,
  providersController.show,
);

providersRouter.put(
  '/update-provider',
  checkRole(['admin', 'rh']),
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      user_profile: {
        id: Joi.string().allow(null, ''),
        firstname: Joi.string().allow(null, ''),
        lastname: Joi.string().allow(null, ''),
        rg: Joi.string().allow(null, ''),
        cpf: Joi.string().allow(null, ''),
        cnpj: Joi.string().allow(null, ''),
        tel: Joi.string().allow(null, ''),
        cel: Joi.string().allow(null, ''),
        birth_date: Joi.string().allow(null, ''),
        pix: Joi.string().allow(null, ''),
        observation: Joi.string().required(),
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
      providers: {
        id: Joi.string().allow(null, ''),
        begin_date: Joi.string().allow(null, ''),
        final_date: Joi.string().allow(null, ''),
        demission_reason: Joi.string().allow(null, ''),
        uniform_size: Joi.string().allow(null, ''),
        voter_registration: Joi.string().allow(null, ''),
        voting_zone: Joi.string().allow(null, ''),
        voting_section: Joi.string().allow(null, ''),
        password_mei: Joi.string().allow(null, ''),
        status: Joi.string().allow(null, ''),
        uniform_amount: Joi.string().allow(null, ''),
        relatives_contacts: Joi.string().allow(null, ''),
        disc: Joi.string().allow(null, ''),
      },
    },
  }),
  providersController.update,
);

export default providersRouter;
