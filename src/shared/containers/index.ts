import { container } from 'tsyringe';
import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';
import IHashProvider from '../provider/hashprovider/interface/IHashProvider';
import BCryptHashProvider from '../provider/hashprovider/implementations/BCryptHashProvider';
import ICoverageRepository from '../../modules/coverage/repositories/ICoverageRepository';
import CoverageRepository from '../../modules/coverage/infra/typeorm/repositories/CoverageRepository';
import IPlansRepository from '../../modules/plans/repositories/IPlansRepository';
import PlansRepository from '../../modules/plans/infra/typeorm/repositories/PlansRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<ICoverageRepository>(
  'CoverageRepository',
  CoverageRepository,
);

container.registerSingleton<IPlansRepository>(
  'PlansRepository',
  PlansRepository,
);
