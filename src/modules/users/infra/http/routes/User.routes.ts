import { Router } from 'express';
import { Joi, celebrate, Segments } from 'celebrate';
import UserController from '../controllers/UserController';

const userRouter = Router();

const userController = new UserController();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  userController.create,
);

export default userRouter;
