import FakeUsersRepository from '../../users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../../shared/provider/hashprovider/fakes/FakeHashProvider';
import CreateUserService from '../../users/services/CreateUserService';
import FakePlansRepository from '../../plans/repositories/fakes/FakePlansRepository';
import CreatePlanService from '../../plans/services/CreatePlanService';
import FakeCoverageRepository from '../../coverage/repositories/fakes/FakeCoverageRepository';
import CreateCoverageService from '../../coverage/services/CreateCoverageService';
import CalculatePriceService from './CaculatePriceService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakePlansRepository: FakePlansRepository;

let createPlan: CreatePlanService;
let createUser: CreateUserService;

let fakeCoverageRepository: FakeCoverageRepository;
let createCoverage: CreateCoverageService;

let calculatePrice: CalculatePriceService;

describe('CreatePlan', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakePlansRepository = new FakePlansRepository();
    fakeCoverageRepository = new FakeCoverageRepository();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createCoverage = new CreateCoverageService(fakeCoverageRepository);
    createPlan = new CreatePlanService(fakePlansRepository);

    calculatePrice = new CalculatePriceService(
      fakePlansRepository,
      fakeCoverageRepository,
    );
  });
  it('Should be able to calculate the value with overtime', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: '123456',
    });
    await createPlan.execute({
      minutes: 30,
      name: 'FalaMais30',
      user_id: user.id,
    });
    await createCoverage.execute({
      destination: 12,
      origin: 14,
      price: 3.47,
      user_id: user.id,
    });

    const value = await calculatePrice.execute({
      destination: 12,
      origin: 14,
      plan: 'FalaMais30',
      time: 48,
    });
    expect(value).toHaveProperty('valueWithoutPlan' && 'valueWithPlan');
  });
  it('Should be able to calculate the value without overtime', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: '123456',
    });
    await createPlan.execute({
      minutes: 30,
      name: 'FalaMais30',
      user_id: user.id,
    });
    await createCoverage.execute({
      destination: 12,
      origin: 14,
      price: 3.47,
      user_id: user.id,
    });

    const value = await calculatePrice.execute({
      destination: 12,
      origin: 14,
      plan: 'FalaMais30',
      time: 8,
    });
    expect(value).toHaveProperty('valueWithoutPlan' && 'valueWithPlan');
  });
  it('Should not be able to calculate the value without a coverage', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: '123456',
    });
    await createPlan.execute({
      minutes: 30,
      name: 'FalaMais30',
      user_id: user.id,
    });
    await expect(
      calculatePrice.execute({
        destination: 12,
        origin: 14,
        plan: 'FalaMais30',
        time: 14,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
  it('Should not be able to calculate the value with a invalid plan', async () => {
    const user = await createUser.execute({
      name: 'Gabriel Asorey',
      email: 'gasorey@gmail.com',
      password: '123456',
    });
    const coverage = await createCoverage.execute({
      destination: 12,
      origin: 14,
      price: 3.47,
      user_id: user.id,
    });

    await expect(
      calculatePrice.execute({
        destination: 12,
        origin: 14,
        time: 14,
        plan: 'non-existing plan',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
