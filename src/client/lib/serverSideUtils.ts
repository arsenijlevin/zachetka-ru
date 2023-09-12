import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { UserDto } from "types/User";
import { GetServerSidePropsContext } from "next";

export function toProps(props: Record<string, unknown>) {
  return {
    props: props,
  };
}

export function getUserFromCookie(context?: GetServerSidePropsContext) {
  const cookies = new Cookies(context?.req.cookies);
  const token = cookies.get<string>("token");
  const decodedCookie = jwt_decode<UserDto>(token);

  return decodedCookie;
}
