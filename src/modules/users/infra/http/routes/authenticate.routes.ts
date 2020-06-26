import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';
import AuthenticateUserController from '../controllers/AuthenticateUserController';

const authenticateRouter = Router();

const authenticateController = new AuthenticateUserController();

authenticateRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  authenticateController.authenticate,
);

export default authenticateRouter;
