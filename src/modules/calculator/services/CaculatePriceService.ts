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
  value: number;
}

@injectable()
class CalculatePriceService {
  constructor(
    @inject('PlansRepository')
    private plansRepository: IPlansRepository,

    @inject('CoverageRepository')
    private coverageRepository: ICoverageRepository,
  ) {}

  public async execute(data: IRequest): Promise<number> {
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

    switch (findPlan.minutes >= time) {
      case false: {
        const { price } = findCoverage;

        const { minutes } = findPlan;

        const timeToPay = time - minutes;

        const priceOverTime = price * 1.1;

        const value = timeToPay * priceOverTime;

        return value;
      }

      default:
        const value = 0;

        return value;
    }
  }
}

export default CalculatePriceService;
