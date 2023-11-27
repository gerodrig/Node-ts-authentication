import {
  AuthRepository,
  AuthDataSource,
  RegisterUserDto,
  UserEntity,
  LoginUserDto,
} from '../../domain';

export class AuthRepositoryImplementation implements AuthRepository {
  //* DI
  constructor(private readonly authDataSource: AuthDataSource) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDataSource.registerUser(registerUserDto);
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return this.authDataSource.loginUser(loginUserDto);
  }
}
