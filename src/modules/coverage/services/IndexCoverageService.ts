import { injectable, inject } from 'tsyringe';
import Coverage from '../infra/typeorm/entities/Coverage';
import ICoverageRepository from '../repositories/ICoverageRepository';

@injectable()
class IndexCoverageService {
  constructor(
    @inject('CoverageRepository')
    private coverageRepository: ICoverageRepository,
  ) {}

  public async execute(): Promise<Coverage[] | undefined> {
    const coverage = await this.coverageRepository.findAll();

    return coverage;
  }
}
export default IndexCoverageService;
