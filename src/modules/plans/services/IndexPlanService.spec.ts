import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../../shared/provider/hashprovider/fakes/FakeHashProvider';
import CreateUserService from '../../users/services/CreateUserService';
import CreatePlanService from './CreatePlanService';
import FakePlansRepository from '../repositories/fakes/FakePlansRepository';
import IndexPlanService from './IndexPlanService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakePlansRepository: FakePlansRepository;

let createPlan: CreatePlanService;
let createUser: CreateUserService;
let indexPlan: IndexPlanService;

describe('CreatePlan', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakePlansRepository = new FakePlansRepository();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createPlan = new CreatePlanService(fakePlansRepository);
    indexPlan = new IndexPlanService(fakePlansRepository);
  });
  it('Should be able to create a new plan', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: '123456',
    });

    await createPlan.execute({
      user_id: user.id,
      name: 'FalaMais10',
      minutes: 10,
    });
    await createPlan.execute({
      user_id: user.id,
      name: 'FalaMais10',
      minutes: 10,
    });
    await createPlan.execute({
      user_id: user.id,
      name: 'FalaMais10',
      minutes: 10,
    });

    const plans = await indexPlan.execute();

    expect(plans?.length).toEqual(3);
  });
});
