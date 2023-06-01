import React from 'react';
import Router from 'next/router';
import { Box, Input, Button, Typography } from '@mui/material';


function App() {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  function handleClick() {
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
      setError('Неверный логин или пароль');
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
