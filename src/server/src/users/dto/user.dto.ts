export type UserDto = {
  login: string;
  name: string;
  password: string;
  rights_id: number;
};

export type UserSafeDto = Omit<UserDto, "password">