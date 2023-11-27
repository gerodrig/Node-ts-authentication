import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";

import type { UserToken } from "../../interfaces/user-token.interface";
import type { SignToken } from "../../types/sign-token.type";


interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) {}

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {

        //Crear user
        const user = await this.authRepository.registerUser(registerUserDto);

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