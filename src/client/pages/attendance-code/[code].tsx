import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { GetServerSidePropsContext } from "next";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { UserDto } from "@shared/types/user/user.dto";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const code = context.query.code;
  const cookies = new Cookies(context.req.cookies);
  const token = cookies.get<string>("token");

  if (!token || typeof code !== "string") return { props: { code: "unauth" } };

  const decodedCookie = jwt_decode<UserDto>(token);

  if (!decodedCookie) return { props: { code: "unauth" } };

  try {
    const isChecked = await axios.post(
      `${process.env.NEXT_PUBLIC_API_HOST}attendance/checkAttendance/${decodedCookie.login}/${code}`
    );
    return isChecked.data ? { props: { code } } : { props: { code: "nouser" } };
  } catch (error) {
    return { props: { code: undefined } };
  }
};

export default function AttendanceCodePage({ code }: { code: string }) {
  const router = useRouter();
  const noUser = code === "nouser" || code === undefined;

  useEffect(() => {
    if (code === "unauth") void router.push("/");
  }, [code]);

  if (code === "unauth") return <></>;

  return (
    <Box
      sx={{
        marginX: "auto",
        height: "500",
        position: "absolute",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {!code ? <Typography variant="h3">Код не обнаружен!</Typography> : <></>}
      {noUser ? (
        <Typography variant="h3">Вы не можете подтвердить присутствие по этому коду!</Typography>
      ) : (
        <Typography variant="h3">Вы успешно подтвердили присутствие по коду {code}!</Typography>
      )}
    </Box>
  );
}
