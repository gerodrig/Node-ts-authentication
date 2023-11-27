import {Router} from 'express';
import { AuthController } from './controller';
import { AuthDatasourceImplementation, AuthRepositoryImplementation } from '../../infrastructure';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new AuthDatasourceImplementation();
        const authRepository = new AuthRepositoryImplementation(datasource);
        const controller = new AuthController(authRepository);

        //*Define your routes here
        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);

        router.get('/',[AuthMiddleware.validateJWT], controller.getUsers);

        return router;
    }
}

