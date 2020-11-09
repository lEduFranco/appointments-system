import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import checkRole from '@modules/users/infra/http/middlewares/checkRole';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const ProfileRouter = Router();
const profileController = new ProfileController();

ProfileRouter.use(ensureAuthenticated);

ProfileRouter.get(
  '/',
  checkRole(['admin', 'rh', 'secretary', 'provider', 'client']),
  profileController.show,
);
ProfileRouter.put(
  '/',
  checkRole(['admin', 'rh', 'secretary', 'provider', 'client']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default ProfileRouter;
