export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface UserInfo {
  id: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  email: string;
  ownerPubKey: string;
  stakePubKey: string;
  authorizedPubKey: string;
}

export interface AuthTokenResponse {
  accessToken: string;
}