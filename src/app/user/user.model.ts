export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: 'customer' | 'admin';
  password?: string;
}

export interface IUserCredentials {
  email: string;
  password: string;
}

export interface IRegisterUser extends IUserCredentials {
  firstName: string;
  lastName: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
}
