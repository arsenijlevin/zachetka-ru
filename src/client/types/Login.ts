import { AxiosResponse } from "axios";

export interface LoginPayload {
  login: string;
  password: string;
}

export type LoginResponse = AxiosResponse<{
  token?: string;
}>;