import { Repository, getRepository } from 'typeorm';
import ICoverageRepository from '../../../repositories/ICoverageRepository';
import Coverage from '../entities/Coverage';
import ICreateCoverageDTO from '../../../dtos/ICreateCoverageDTO';
import IFindCoverageDTO from '../../../dtos/IFindCoverageDTO';

class CoverageRepository implements ICoverageRepository {
  private ormRepository: Repository<Coverage>;

  constructor() {
    this.ormRepository = getRepository(Coverage);
  }

  public async create(data: ICreateCoverageDTO): Promise<Coverage> {
    const coverage = this.ormRepository.create(data);

    await this.ormRepository.save(coverage);

    return coverage;
  }

  public async findAll(): Promise<Coverage[] | undefined> {
    const coverage = await this.ormRepository.find({
      relations: ['user'],
    });

    return coverage;
  }

  public async findByOriginAndDestination(
    data: IFindCoverageDTO,
  ): Promise<Coverage | undefined> {
    const { destination, origin } = data;

    const coverage = await this.ormRepository.findOne({
      relations: ['user'],
      where: {
        destination,
        origin,
      },
    });
    return coverage;
  }
}
export default CoverageRepository;
