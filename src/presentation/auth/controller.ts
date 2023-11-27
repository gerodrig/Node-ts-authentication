import { Request, Response } from 'express';
import { UserModel } from '../../data';
import {
  AuthRepository,
  CustomError,
  RegisterUser,
  RegisterUserDto,
  LoginUser,
  LoginUserDto,
} from '../../domain';
import { JwtAdapter } from '../../config';

export class AuthController {
  //*DI
  constructor(private readonly authRepository: AuthRepository) {}

  //*define custom errors
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return this.handleError(error, res);

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((userToken) => {
        res.json(userToken);
      })
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return this.handleError(error, res);

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((userToken) => {
        res.json(userToken);
      })
      .catch((error) => this.handleError(error, res));
  };

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) =>
        res.json({
          users,
          token: req.body.user,
        })
      )
      .catch((error) =>
        res.status(500).json({ error: 'Internal Server Error' })
      );
  };
}
