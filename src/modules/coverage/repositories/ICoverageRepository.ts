import ICreateCoverageDTO from '../dtos/ICreateCoverageDTO';
import Coverage from '../infra/typeorm/entities/Coverage';

export default interface ICroverageRepository {
  create(data: ICreateCoverageDTO): Promise<Coverage>;
  findAll(): Promise<Coverage[] | undefined>;
}
