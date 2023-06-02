import React from 'react';
import Router from 'next/router';
import { Box, Input, Button, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';

interface LoginPayload {
  login: string;
  password: string;
}

type LoginResponse = AxiosResponse<{
  token?: string;
}>

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

      const cookies = new Cookies();

      if (!loginRequest.data.token) {
        throw new Error()
      }

      cookies.set('token', loginRequest.data.token, { path: '/' });
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

    if (login === 'admin' && password === '0000') {
      return Router.push('/admin-panel');
    }
    else if (login === 'lecturer' && password === '0000') {
      return Router.push('/subjects-list');
    }
    else if (login === 'student' && password === '0000') {
      return Router.push('/schedule-table');
    }
    else {
      return Router.push('/admin-panel');
    }
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
