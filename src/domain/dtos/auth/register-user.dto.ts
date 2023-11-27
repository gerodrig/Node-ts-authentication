import { Validators } from "../../../config";


export class RegisterUserDto {

    private constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ){}

    static create(object: {[key: string]: any}): [string?, RegisterUserDto?] {

        const { name, email, password } = object;

        if(!name) return ['Name is required'];

        if(!email) return ['Email is required'];
        if(!Validators.email.test(email)) return ['Email is invalid'];

        if(!password) return ['Password is required'];
        if(password.length < 8) return ['Password must be at least 8 characters'];

        return [undefined, new RegisterUserDto(name, email, password)];
    }
}