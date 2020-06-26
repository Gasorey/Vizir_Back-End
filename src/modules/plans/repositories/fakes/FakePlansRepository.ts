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

  public async findByName(name: string): Promise<Plan | undefined> {
    const myPlan = this.plans.find(plan => plan.name === name);

    return myPlan;
  }
}

export default FakePlansRepository;
