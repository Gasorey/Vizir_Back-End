import { Router } from 'express';
import userRouter from '../../../../modules/users/infra/http/routes/User.routes';
import authenticateRouter from '../../../../modules/users/infra/http/routes/authenticate.routes';
import coverageRouter from '../../../../modules/coverage/infra/http/routes/Coverage.routes';
import plansRouter from '../../../../modules/plans/infra/http/routes/Plans.routes';
import calculatorRouter from '../../../../modules/calculator/http/routes/Calculator.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/session', authenticateRouter);
routes.use('/coverage', coverageRouter);
routes.use('/plans', plansRouter);
routes.use('/calculator', calculatorRouter);

export default routes;
