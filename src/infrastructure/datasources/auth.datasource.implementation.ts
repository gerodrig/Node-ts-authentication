import { UserModel } from '../../data';
import {
  AuthDataSource,
  RegisterUserDto,
  UserEntity,
  CustomError,
LoginUserDto,
} from '../../domain';
import { BcryptAdapter } from '../../config/bcrypt-adapter';
import { UserMapper } from '..';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;

export class AuthDatasourceImplementation implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      //*1. // Check if user already exists
      const emailExists = await UserModel.findOne({ email });

      if (emailExists) {
        throw CustomError.badRequest('Email already exists');
      }

      const user = await UserModel.create({
        name,
        email,
        //*2. // Hash password
        password: this.hashPassword(password),
      });

      //*3. // Save user in database
      await user.save();

      //*4. Return user with a mapper help
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServerError();
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      //*1. // Check if user already exists
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw CustomError.badRequest('Email or password incorrect');
      }

      //*2. // Compare password
      const passwordMatch = this.comparePassword(password, user.password);

      if (!passwordMatch) {
        throw CustomError.badRequest('Email or password incorrect');
      }

      //*3. // Save user in database
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServerError();
    }
  }

}
