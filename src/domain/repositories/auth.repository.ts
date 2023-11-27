import { LoginUserDto, RegisterUserDto } from "..";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {

    
    abstract registerUser(registerUserDto: RegisterUserDto): Promise<UserEntity>;

    abstract loginUser(loginUserDto: LoginUserDto): Promise<UserEntity>;
}