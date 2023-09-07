import { AuthUseCases } from '../auth.use-case';
import { Strategy } from 'passport-local';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authUseCases;
    constructor(authUseCases: AuthUseCases);
    validate(username: string, password: string): Promise<any>;
}
export {};
