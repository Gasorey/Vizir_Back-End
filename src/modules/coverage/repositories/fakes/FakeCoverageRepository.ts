import { uuid } from 'uuidv4';
import ICoverageRepository from '../ICoverageRepository';
import Coverage from '../../infra/typeorm/entities/Coverage';
import ICreateCoverageDTO from '../../dtos/ICreateCoverageDTO';

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
}
