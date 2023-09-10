import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

export default function useCookie<T>() {
  const cookies = new Cookies();
  const token = cookies.get<string>("token");

  return jwt_decode<T>(token);
}
