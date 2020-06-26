import ICreateCoverageDTO from '../dtos/ICreateCoverageDTO';
import Coverage from '../infra/typeorm/entities/Coverage';
import IFindCoverageDTO from '../dtos/IFindCoverageDTO';

export default interface ICoverageRepository {
  create(data: ICreateCoverageDTO): Promise<Coverage>;
  findAll(): Promise<Coverage[] | undefined>;
  findByOriginAndDestination(
    data: IFindCoverageDTO,
  ): Promise<Coverage | undefined>;
}
