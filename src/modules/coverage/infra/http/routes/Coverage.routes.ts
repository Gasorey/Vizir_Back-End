import { Router } from 'express';
import CoverageController from '../controllers/CoverageController';
import ensureAuthenticated from '../../../../../shared/infra/http/middleware/ensureAuthenticated';

const coverageRouter = Router();

const coverageController = new CoverageController();

coverageRouter.use(ensureAuthenticated);

coverageRouter.post('/', coverageController.create);
coverageRouter.get('/', coverageController.index);

export default coverageRouter;
