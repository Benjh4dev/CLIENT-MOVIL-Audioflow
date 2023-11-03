import { User } from './user';

export interface RegisterCredentials {
    username: string;
    password: string;
    email: string;
};

export interface LoginCredentials {
    email: string;
    password: string;
};

export interface StoreUser {
    user: User;
    token: string;
};

export interface DecodedToken {
    exp: number;
    [key: string]: any;
}