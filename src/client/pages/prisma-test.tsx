import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { LoginResponseDto } from '@shared/types/auth/login.dto';

function PrismaTest() {
    const [result, setResult] = React.useState('');

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const body = {
                login: 'back_test',
                password: 'back_test'
            }
            const loginRequest = await axios.post<LoginResponseDto>(`${process.env.NEXT_PUBLIC_API_HOST || ""}auth/login`, body);
            const loginResponse = loginRequest.data;

            if (!loginResponse) {
                throw new Error()
            }

            setResult(loginResponse.token || "");
        } catch (error) {
            return;
        }
    }
    return (
        <>
            <Box>
                <Typography variant='h5'>Тест базы данных</Typography>
                <Button onClick={handleClick}>Тест логин!</Button>
                <Typography variant='body2'>Результат: {result}</Typography>
            </Box>
        </>
    );
}


export default PrismaTest;