import { User } from "./user.interface";

export interface UserToken {
    token: string;
    user: User
}