import { injectable, inject } from 'tsyringe';
import IPlansRepository from '../../plans/repositories/IPlansRepository';
import ICoverageRepository from '../../coverage/repositories/ICoverageRepository';

interface IRequest {
  origin: number;
  destination: number;
  time: number;
  plan: string;
}

interface IResponse {
  valueWithPlan: number;
  valueWithoutPlan: number;
}

@injectable()
class CalculatePriceService {
  constructor(
    @inject('PlansRepository')
    private plansRepository: IPlansRepository,

    @inject('CoverageRepository')
    private coverageRepository: ICoverageRepository,
  ) {}

  public async execute(data: IRequest): Promise<IResponse> {
    const { origin, destination, time, plan } = data;

    const findCoverage = await this.coverageRepository.findByOriginAndDestination(
      { origin, destination },
    );

    if (!findCoverage) {
      throw new Error('Coverage does not find');
    }

    const findPlan = await this.plansRepository.findByName(plan);

    if (!findPlan) {
      throw new Error('Plan does not exist');
    }

    const { price } = findCoverage;

    const { minutes } = findPlan;

    const overTime = time - minutes;

    if (overTime <= 0) {
      const valueWithPlan = 0;

      const valueWithoutPlan = price * time;

      const result = {
        valueWithoutPlan,
        valueWithPlan,
      };
      return result;
    }

    const coveragePriceAdjust = price * 1.1;

    const valueWithPlan = coveragePriceAdjust * overTime;

    const valueWithoutPlan = price * time;

    const result = {
      valueWithoutPlan,
      valueWithPlan,
    };
    return result;
  }
}

export default CalculatePriceService;
