import { injectable, inject } from 'tsyringe';
import ICoverageRepository from '../repositories/ICoverageRepository';
import Coverage from '../infra/typeorm/entities/Coverage';
import IFindCoverageDTO from '../dtos/IFindCoverageDTO';

@injectable()
class FindCoverageService {
  constructor(
    @inject('CoverageRepository')
    private coverageRepository: ICoverageRepository,
  ) {}

  public async execute(data: IFindCoverageDTO): Promise<Coverage | undefined> {
    const coverage = await this.coverageRepository.findByOriginAndDestination(
      data,
    );

    return coverage;
  }
}

export default FindCoverageService;
