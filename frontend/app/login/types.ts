export interface TLoginDataRs {
    user: TUser;
    token: string;
}

export interface TLoginRq {
    email: string;
    password: String;
}

export interface TUser {
    email: string;
    password: string;
    username: string;
}
