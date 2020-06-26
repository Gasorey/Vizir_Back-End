import { Router } from 'express';
import ensureAuthenticated from '../../../../../shared/infra/http/middleware/ensureAuthenticated';
import PlansControllers from '../controllers/PlansController';

const plansRouter = Router();

const plansController = new PlansControllers();

plansRouter.use(ensureAuthenticated);

plansRouter.post('/', plansController.create);
plansRouter.get('/', plansController.index);

export default plansRouter;
