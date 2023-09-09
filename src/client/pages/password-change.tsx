import React from "react";
import Router from "next/router";
import { Box, Input, Button, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookiesText = context.req.headers.cookie;

  if (cookiesText) {
    const cookies = new Cookies(cookiesText);

    const token = cookies.get<string>("token");
    const decodedCookie: Record<string, string> = jwt_decode(token);

    return { props: { decodedCookie } } as {
      props: {
        decodedCookie: Record<string, string>;
      };
    };
  }

  return { props: { decodedCookie: "" } };
};

function PasswordChange({ decodedCookie }: { decodedCookie: Record<string, unknown> }) {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordRepeated, setNewPasswordRepeated] = React.useState("");
  const [error, setError] = React.useState("");

  async function handleClick() {
    if (newPassword !== newPasswordRepeated) {
      setError("Пароли не совпадают");
    }

    try {
      const cookies = new Cookies();
      const token = cookies.get<string>("token");

      if (!token) {
        throw new Error();
      }

      const header = {
        Authorization: `Bearer ${token}`,
      };

      const body = {
        login: decodedCookie.login,
        oldPassword: currentPassword,
        newPassword: newPassword,
      };

      const changePasswordRequest = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_HOST || ""}users/change-password`,
        body,
        { headers: header }
      );

      if (changePasswordRequest.status === 200) console.log("Пароль успешно изменен!");
    } catch (error) {
      console.log(error);

      setError("Произошла непредвиденная ошибка!");
      return;
    }

    return Router.push("/");
  }

  return (
    <>
      <Box
        sx={{
          marginX: "auto",
          width: "500",
          height: "500",
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h3">Смена пароля</Typography>
        <Box sx={{ alignItems: "center", justifyContent: "center" }}>
          <br />
          <Box>
            <Typography variant="body1">Введите текущий пароль</Typography>
            <Input
              type="password"
              className="mt-2 p-1"
              fullWidth
              onChange={(e) => setCurrentPassword(e.target.value)}
            ></Input>
          </Box>
          <br />
          <Box>
            <Typography variant="body1">Введите новый пароль</Typography>
            <Input
              type="password"
              className="mt-2 p-1"
              fullWidth
              onChange={(e) => setNewPassword(e.target.value)}
            ></Input>
          </Box>
          <br />
          <Box>
            <Typography variant="body1">Введите новый пароль ещё раз</Typography>
            <Input
              type="password"
              className="mt-2 p-1"
              fullWidth
              onChange={(e) => setNewPasswordRepeated(e.target.value)}
            ></Input>
          </Box>
          <br />
          <Typography variant="body1" color={"red"}>
            {error}
          </Typography>
          <Button variant="outlined" style={{ width: "100%", margin: "center" }} onClick={handleClick}>
            Сменить пароль
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default PasswordChange;
