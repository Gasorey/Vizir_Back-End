import CreateCoverageService from './CreateCoverageService';
import FakeCoverageRepository from '../repositories/fakes/FakeCoverageRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../../shared/provider/hashprovider/fakes/FakeHashProvider';
import CreateUserService from '../../users/services/CreateUserService';
import FindCoverageService from './FindCoverageService';

let fakeCoverageRepository: FakeCoverageRepository;
let coverageService: CreateCoverageService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let findCoverage: FindCoverageService;

describe('IndexCoverage', () => {
  beforeEach(() => {
    fakeCoverageRepository = new FakeCoverageRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    coverageService = new CreateCoverageService(fakeCoverageRepository);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    findCoverage = new FindCoverageService(fakeCoverageRepository);
  });
  it('Should be able to find a coverage', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: '123456',
    });

    await coverageService.execute({
      destination: 17,
      origin: 25,
      price: 1.25,
      user_id: user.id,
    });
    await coverageService.execute({
      destination: 12,
      origin: 14,
      price: 1.25,
      user_id: user.id,
    });

    const coverage = await findCoverage.execute({
      destination: 17,
      origin: 25,
    });

    expect(coverage).toHaveProperty('id');
  });
});
