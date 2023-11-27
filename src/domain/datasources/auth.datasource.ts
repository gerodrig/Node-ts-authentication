import { LoginUserDto, RegisterUserDto } from "..";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthDataSource {

    abstract registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;

    abstract loginUser(loginUserDto: LoginUserDto): Promise<UserEntity>;
}