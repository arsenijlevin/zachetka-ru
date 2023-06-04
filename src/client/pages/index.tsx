import React from 'react';
import Router from 'next/router';
import { Box, Input, Button, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import { UserDto } from '@shared/types/user/user.dto';

interface LoginPayload {
  login: string;
  password: string;
}

type LoginResponse = AxiosResponse<{
  token?: string;
}>

/* export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookiesText = context.req.headers.cookie;

  if (cookiesText) {
      const cookies = new Cookies(cookiesText);

      const token = cookies.get<string>("token");
      if (!token) return { props: { decodedCookie: "" } }
      const decodedCookie: UserDto = jwt_decode(token);

      return { props: { decodedCookie } } as {
          props: {
              decodedCookie: UserDto;
          }
      };
  }

  return { props: { decodedCookie: "" } }
};*/


function App() {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  async function handleClick() {
    const body = {
      login,
      password,
    };
    try {
      const loginRequest = await axios.post<LoginPayload, LoginResponse>(`${process.env.NEXT_PUBLIC_API_HOST || ""}auth/login`, body);

      const cookies =  new Cookies();

      if (!loginRequest.data.token) {
        throw new Error()
      }

      cookies.set('token', loginRequest.data.token, { path: '/' });
      const token = cookies.get<string>("token");
      if (!token) return { props: { decodedCookie: "" } }
      const decodedCookie: UserDto = jwt_decode(token);
      console.log(decodedCookie);
      if (decodedCookie.rights_id === 3) {
        return Router.push('/admin-panel');
      }
      else if (decodedCookie.rights_id === 1) {
        return Router.push('/subjects-list');
      }
      else if (decodedCookie.rights_id === 2) {
        return Router.push('/schedule-table');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setError('Неверный логин или пароль');
        } else {
          setError('Произошла непредвиденная ошибка!');
        }
      } else {
        setError('Произошла непредвиденная ошибка!');
      }
      return;
    }

    /* 
    {
      "login": "login",
      "password": "password",
    }
    */
    
  }

  return (
    <>
      <Box sx={{ marginX: 'auto', width: '500', height: '500', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <Typography variant='h3'>Вход в систему</Typography>
        <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <br />
          <Box>
            <Typography variant="body1">Введите логин</Typography>
            <Input type="text" className="mt-2 p-1" fullWidth onChange={(e) => setLogin(e.target.value)}></Input>
          </Box>
          <br />
          <Box>
            <Typography variant="body1">Введите пароль</Typography>
            <Input type="password" className="mt-2 p-1" fullWidth onChange={(e) => setPassword(e.target.value)}></Input>
          </Box>
          <br />
          <Typography variant="body1" color={'red'}>{error}</Typography>
          <Button variant='outlined' style={{ width: '100%', margin: 'center' }} onClick={handleClick}>Войти</Button>
        </Box>
      </Box>
    </>
  );
}

export default App;
