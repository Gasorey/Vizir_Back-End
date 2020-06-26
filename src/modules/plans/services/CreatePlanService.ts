import { inject, injectable } from 'tsyringe';
import IPlansRepository from '../repositories/IPlansRepository';
import ICreatePlansDTO from '../dtos/ICreatePlansDTO';
import Plan from '../infra/typeorm/entities/Plan';

@injectable()
class CreatePlanService {
  constructor(
    @inject('PlansRepository')
    private plansRepository: IPlansRepository,
  ) {}

  public async execute(data: ICreatePlansDTO): Promise<Plan> {
    const plan = await this.plansRepository.create(data);

    return plan;
  }
}

export default CreatePlanService;
