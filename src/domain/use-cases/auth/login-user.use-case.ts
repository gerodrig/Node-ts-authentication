import { JwtAdapter } from "../../../config";
import { LoginUserDto } from '../../dtos/auth/login-user.dto';
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

//? Interfaces and types imports
import type { UserToken } from "../../interfaces/user-token.interface";
import type { SignToken } from "../../types/sign-token.type";


interface LoginUserUseCase {
    execute(registerUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) {}

    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {

        //Login user
        const user = await this.authRepository.loginUser(loginUserDto);

        //token
        const token = await this.signToken({id: user.id}, '2h');
        if(!token) throw CustomError.internalServerError('Error generating token');


        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
    }

}