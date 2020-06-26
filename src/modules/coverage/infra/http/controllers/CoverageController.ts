import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCoverageService from '../../../services/CreateCoverageService';
import IndexCoverageService from '../../../services/IndexCoverageService';

class CoverageController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { origin, destination, price } = request.body;

    const createCoverage = container.resolve(CreateCoverageService);

    const coverage = await createCoverage.execute({
      user_id,
      origin,
      destination,
      price,
    });

    return response.json(coverage);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexCoverage = container.resolve(IndexCoverageService);

    const coverage = await indexCoverage.execute();

    return response.json(coverage);
  }
}
export default CoverageController;
