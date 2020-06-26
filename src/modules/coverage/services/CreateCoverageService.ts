import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import ICoverageRepository from '../repositories/ICoverageRepository';
import Coverage from '../infra/typeorm/entities/Coverage';

interface IRequest {
  origin: number;
  destination: number;
  user_id: string;
  price: number;
}

@injectable()
class CreateCoverageService {
  constructor(
    @inject('CoverageRepository')
    private coverageRepository: ICoverageRepository,
  ) {}

  public async execute(data: IRequest): Promise<Coverage> {
    const { destination, origin, user_id, price } = data;

    const myCombination = destination + origin;

    const coverage = await this.coverageRepository.create({
      destination,
      origin,
      user_id,
      price,
      combination: myCombination,
    });

    return coverage;
  }
}

export default CreateCoverageService;
