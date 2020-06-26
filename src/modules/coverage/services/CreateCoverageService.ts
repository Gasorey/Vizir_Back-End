import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import ICoverageRepository from '../repositories/ICoverageRepository';
import ICreateCoverageDTO from '../dtos/ICreateCoverageDTO';
import Coverage from '../infra/typeorm/entities/Coverage';

@injectable()
class CreateCoverageService {
  constructor(
    @inject('CoverageRepository')
    private coverageRepository: ICoverageRepository,
  ) {}

  public async execute(data: ICreateCoverageDTO): Promise<Coverage> {
    const coverage = await this.coverageRepository.create(data);

    return coverage;
  }
}

export default CreateCoverageService;
