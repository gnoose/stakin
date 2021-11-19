import {doGet, doPost} from './http';
import {AuthTokenResponse, LoginRequest, RegisterRequest, UserInfo} from '../types/auth';

export const AuthService = {
  login: (body: LoginRequest): Promise<AuthTokenResponse> => {
    return doPost('/auth/login', body);
  },
  register: (body: RegisterRequest): Promise<AuthTokenResponse> => {
    return doPost('/auth/register', body);
  },
  auth: (): Promise<UserInfo> => {
    return doGet<UserInfo>('/auth');
  }
};