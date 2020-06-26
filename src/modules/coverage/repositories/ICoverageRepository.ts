import ICreateCoverageDTO from '../dtos/ICreateCoverageDTO';
import Coverage from '../infra/typeorm/entities/Coverage';

export default interface ICoverageRepository {
  create(data: ICreateCoverageDTO): Promise<Coverage>;
  findAll(): Promise<Coverage[] | undefined>;
}
