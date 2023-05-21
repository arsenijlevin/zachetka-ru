import React from 'react';
import Router from 'next/router';
import { Box, Input, Button, Typography } from '@mui/material';

function PasswordChange() {
    const [password, setPassword] = React.useState('0000');
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [newPasswordRepeated, setNewPasswordRepeated] = React.useState('');
    const [error, setError] = React.useState('');

    function handleClick() {
        if (currentPassword === password && newPassword === newPasswordRepeated) {
            setPassword(newPassword);
            return Router.push('/');
        }
        else if (newPassword !== newPasswordRepeated) {
            setError('Пароли не совпадают');
        }
        else {
            setError('Неверный пароль');
        }
    }

    return(
        <>
            <Box sx={{ marginX: 'auto', width: '500', height: '500', position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <Typography variant='h3'>Смена пароля</Typography>
                <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
                    <br />
                    <Box>
                        <Typography variant="body1">Введите текущий пароль</Typography>
                        <Input type="password" className="mt-2 p-1" fullWidth onChange={(e) => setCurrentPassword(e.target.value)}></Input>
                    </Box>
                    <br />
                    <Box>
                        <Typography variant="body1">Введите новый пароль</Typography>
                        <Input type="password" className="mt-2 p-1" fullWidth onChange={(e) => setNewPassword(e.target.value)}></Input>
                    </Box>
                    <br />
                    <Box>
                        <Typography variant="body1">Введите новый пароль ещё раз</Typography>
                        <Input type="password" className="mt-2 p-1" fullWidth onChange={(e) => setNewPasswordRepeated(e.target.value)}></Input>
                    </Box>
                    <br />
                    <Typography variant="body1" color={'red'}>{error}</Typography>
                    <Button variant='outlined' style={{ width: '100%', margin: 'center' }} onClick={handleClick}>Сменить пароль</Button>
                </Box>
            </Box>
        </>
    );
}

export default PasswordChange;