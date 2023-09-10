import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useState, MouseEvent } from "react";
import { LoginResponseDto } from "@shared/types/auth/login.dto";

/**
 * TODO: Удалить
 */

function PrismaTest() {
  const [result, setResult] = useState("");

  const handleClick = async (_: MouseEvent<HTMLButtonElement>) => {
    try {
      const body = {
        login: "back_test",
        password: "back_test",
      };
      const loginRequest = await axios.post<LoginResponseDto>(
        `auth/login`,
        body
      );
      const loginResponse = loginRequest.data;

      if (!loginResponse) {
        throw new Error();
      }

      setResult(loginResponse.token ?? "");
    } catch (error) {
      return;
    }
  };
  return (
    <>
      <Box>
        <Typography variant="h5">Тест базы данных</Typography>
        <Button onClick={handleClick}>Тест логин!</Button>
        <Typography variant="body2">Результат: {result}</Typography>
      </Box>
    </>
  );
}

export default PrismaTest;
