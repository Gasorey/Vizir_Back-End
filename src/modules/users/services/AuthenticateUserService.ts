import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../../../shared/provider/hashprovider/interface/IHashProvider';
import User from '../infra/typeorm/entities/User';
import authConfig from '../../../config/auth';

interface IResponse {
  user: User;
  token: string;
}

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Incorrect email/password or this user does not exist');
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new Error('Incorrect email/password or this user does not exist');
    }

    const { expirestIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expirestIn,
    });

    return { user, token };
  }
}
export default AuthenticateUserService;
