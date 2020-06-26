import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../../shared/provider/hashprovider/fakes/FakeHashProvider';
import CreateUserService from '../../users/services/CreateUserService';
import CreatePlanService from './CreatePlanService';
import FakePlansRepository from '../repositories/fakes/FakePlansRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakePlansRepository: FakePlansRepository;

let createPlan: CreatePlanService;
let createUser: CreateUserService;

describe('CreatePlan', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakePlansRepository = new FakePlansRepository();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createPlan = new CreatePlanService(fakePlansRepository);
  });
  it('Should be able to create a new plan', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: '123456',
    });

    const plan = await createPlan.execute({
      user_id: user.id,
      name: 'FalaMais10',
      minutes: 10,
    });

    expect(plan).toHaveProperty('id');
  });
});
