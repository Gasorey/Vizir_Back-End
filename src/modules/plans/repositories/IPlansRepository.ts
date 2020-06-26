import ICreatePlansDTO from '../dtos/ICreatePlansDTO';
import Plan from '../infra/typeorm/entities/Plan';

export default interface IPlansRepository {
  create(data: ICreatePlansDTO): Promise<Plan>;
  findAll(): Promise<Plan[] | undefined>;
  findByName(name: string): Promise<Plan | undefined>;
}
