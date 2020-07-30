import { User } from '../models/user.model';


export interface GetUsers {
    total: number;
    users: User[];
}
