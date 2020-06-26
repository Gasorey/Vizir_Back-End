import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePlanService from '../../../services/CreatePlanService';
import IndexPlanService from '../../../services/IndexPlanService';

class PlansControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { name, minutes } = request.body;

    const createPlan = container.resolve(CreatePlanService);

    const plan = await createPlan.execute({
      user_id,
      name,
      minutes,
    });

    return response.json(plan);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexPlans = container.resolve(IndexPlanService);

    const plans = await indexPlans.execute();

    return response.json(plans);
  }
}

export default PlansControllers;
