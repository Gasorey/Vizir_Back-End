import { uuid } from 'uuidv4';
import IPlansRepository from '../IPlansRepository';
import Plan from '../../infra/typeorm/entities/Plan';
import ICreatePlansDTO from '../../dtos/ICreatePlansDTO';

class FakePlansRepository implements IPlansRepository {
  private plans: Plan[] = [];

  public async create(data: ICreatePlansDTO): Promise<Plan> {
    const plan = new Plan();

    Object.assign(plan, { id: uuid(), ...data });

    this.plans.push(plan);

    return plan;
  }

  public async findAll(): Promise<Plan[] | undefined> {
    return this.plans;
  }
}

export default FakePlansRepository;
