import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  create(createData: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
