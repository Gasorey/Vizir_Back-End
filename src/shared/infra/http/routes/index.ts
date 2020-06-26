import { Router } from 'express';
import userRouter from '../../../../modules/users/infra/http/routes/User.routes';
import authenticateRouter from '../../../../modules/users/infra/http/routes/authenticate.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/session', authenticateRouter);

export default routes;
