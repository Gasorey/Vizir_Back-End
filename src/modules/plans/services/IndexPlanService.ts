import { inject, injectable } from 'tsyringe';
import IPlansRepository from '../repositories/IPlansRepository';
import Plan from '../infra/typeorm/entities/Plan';

@injectable()
class IndexPlanService {
  constructor(
    @inject('PlansRepository')
    private plansRepository: IPlansRepository,
  ) {}

  public async execute(): Promise<Plan[] | undefined> {
    const plan = await this.plansRepository.findAll();

    return plan;
  }
}
export default IndexPlanService;
