import CreateCoverageService from './CreateCoverageService';
import FakeCoverageRepository from '../repositories/fakes/FakeCoverageRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../../shared/provider/hashprovider/fakes/FakeHashProvider';
import CreateUserService from '../../users/services/CreateUserService';
import IndexCoverageService from './IndexCoverageService';

let fakeCoverageRepository: FakeCoverageRepository;
let coverageService: CreateCoverageService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let indexCoverage: IndexCoverageService;

describe('IndexCoverage', () => {
  beforeEach(() => {
    fakeCoverageRepository = new FakeCoverageRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    coverageService = new CreateCoverageService(fakeCoverageRepository);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    indexCoverage = new IndexCoverageService(fakeCoverageRepository);
  });
  it('Should be able to create a new coverage', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: '123456',
    });

    await coverageService.execute({
      destination: 12,
      origin: 14,
      price: 1.25,
      user_id: user.id,
    });
    await coverageService.execute({
      destination: 12,
      origin: 14,
      price: 1.25,
      user_id: user.id,
    });

    const coverage = await indexCoverage.execute();

    expect(coverage?.length).toEqual(2);
  });
});
