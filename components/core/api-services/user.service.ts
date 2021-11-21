import {doPost, doPut} from './http';
import {UserInfo} from '../types/auth';
import {UserUpdateRequest} from '../types/user';

export const UserService = {
  updateUser: (userId: string, body: UserUpdateRequest): Promise<UserInfo> => {
    return doPut(`/users/${userId}`, body);
  },
  createAccount: (): Promise<UserInfo> => {
    return doPost('/users/create-account', {});
  },
  createStakeAccount: (): Promise<UserInfo> => {
    return doPost('/users/create-stake-account', {});
  },
  stake: (stakeAmount: number): Promise<UserInfo> => {
    return doPost('/users/stake', {amount: stakeAmount});
  },
  withdraw: (withdrawAmount: number): Promise<UserInfo> => {
    return doPost('/users/withdraw', {amount: withdrawAmount});
  }
};