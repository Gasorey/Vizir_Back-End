import { Repository, getRepository } from 'typeorm';
import IPlansRepository from '../../../repositories/IPlansRepository';
import Plan from '../entities/Plan';
import ICreatePlansDTO from '../../../dtos/ICreatePlansDTO';

class PlansRepository implements IPlansRepository {
  private ormRepository: Repository<Plan>;

  constructor() {
    this.ormRepository = getRepository(Plan);
  }

  public async create(data: ICreatePlansDTO): Promise<Plan> {
    const plan = this.ormRepository.create(data);

    await this.ormRepository.save(plan);

    return plan;
  }

  public async findAll(): Promise<Plan[] | undefined> {
    const plan = await this.ormRepository.find({
      relations: ['user'],
    });

    return plan;
  }
}

export default PlansRepository;
