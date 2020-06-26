import { uuid } from 'uuidv4';
import ICoverageRepository from '../ICoverageRepository';
import Coverage from '../../infra/typeorm/entities/Coverage';
import ICreateCoverageDTO from '../../dtos/ICreateCoverageDTO';
import IFindCoverageDTO from '../../dtos/IFindCoverageDTO';

export default class FakeCoverageRepository implements ICoverageRepository {
  private coverage: Coverage[] = [];

  public async create(data: ICreateCoverageDTO): Promise<Coverage> {
    const coverage = new Coverage();

    Object.assign(coverage, { id: uuid(), ...data });

    this.coverage.push(coverage);

    return coverage;
  }

  public async findAll(): Promise<Coverage[] | undefined> {
    return this.coverage;
  }

  public async findByOriginAndDestination(
    data: IFindCoverageDTO,
  ): Promise<Coverage | undefined> {
    const { destination, origin } = data;

    const findCoverage = this.coverage.find(
      coverage =>
        coverage.origin === origin && coverage.destination === destination,
    );

    return findCoverage;
  }
}
