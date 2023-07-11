export interface IUser {
    username: string;
    email: string;
    password: string;   
}

export interface IRegisterRq extends IUser {}

export interface ILoginRq extends IUser {}

export interface IUserUpdateRq extends Partial<IUser> {}