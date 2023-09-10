export interface UserDto {
  login: string;
  name: string;
  rights_id: number;
}

export type UserUnsafeDto = UserDto & {
  password: string;
};
