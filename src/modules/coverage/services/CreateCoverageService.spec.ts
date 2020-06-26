import CreateCoverageService from './CreateCoverageService';
import FakeCoverageRepository from '../repositories/fakes/FakeCoverageRepository';
import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../../shared/provider/hashprovider/fakes/FakeHashProvider';
import CreateUserService from '../../users/services/CreateUserService';

let fakeCoverageRepository: FakeCoverageRepository;
let coverageService: CreateCoverageService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateCoverage', () => {
  beforeEach(() => {
    fakeCoverageRepository = new FakeCoverageRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    coverageService = new CreateCoverageService(fakeCoverageRepository);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });
  it('Should be able to create a new coverage', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: '123456',
    });

    const coverage = await coverageService.execute({
      destination: 12,
      origin: 14,
      price: 1.25,
      user_id: user.id,
    });
    expect(coverage).toHaveProperty('id');
  });
});
