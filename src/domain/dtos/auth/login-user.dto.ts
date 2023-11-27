import { Validators } from "../../../config";

export class LoginUserDto {

    private constructor(
        public readonly email: string,
        public readonly password: string,
    ){}

    static create(object: {[key: string]: any}): [string?, LoginUserDto?] {

        const { email, password } = object;

        if(!email) return ['Email is required'];
        if(!Validators.email.test(email)) return ['Email is invalid'];

        if(!password) return ['Password is required'];
        if(password.length < 8) return ['Password must be at least 8 characters'];

        return [undefined, new LoginUserDto(email, password)];
    }
}