import { CustomError } from '../../domain';
import { UserEntity } from '../../domain/entities/user.entity';


export class UserMapper {

    static userEntityFromObject(object: {[key: string]: any}){

        const { id, _id, name, email, password, roles } = object;

        if(!id && !_id) {
            throw CustomError.badRequest('Invalid user id');
        }
        if(!name) throw CustomError.badRequest('Invalid user name');
        if(!email) throw CustomError.badRequest('Invalid user email');
        if(!password) throw CustomError.badRequest('Invalid user password');
        if(!roles) throw CustomError.badRequest('Invalid user roles');

        return new UserEntity(
            _id || id,
            name,
            email,
            password,
            roles,
        );
    }
}