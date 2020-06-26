import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CalculatePriceService from '../../services/CaculatePriceService';

class CalculatorController {
  public async calculate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { destination, origin, time, plan } = request.body;

    const calculate = container.resolve(CalculatePriceService);

    const value = await calculate.execute({
      destination,
      origin,
      plan,
      time,
    });
    return response.json(value);
  }
}
export default CalculatorController;
