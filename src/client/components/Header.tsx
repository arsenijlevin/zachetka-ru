import { Box, AppBar, Button } from '@mui/material';
import React from 'react';
import Link from 'next/link';

function Header() {
    return(
        <Box>
            <AppBar position='static' sx={{ bgcolor: 'rgb(220, 220, 220)', minHeight: '50px' }}>
                <Box sx={{ ml: 'auto', my: 'auto' }}>
                    <Link href='password-change' passHref>
                        <Button variant='contained' style={{ width: '250px', marginRight: '10px', backgroundColor: 'rgb(30, 144, 255)' }}>Сменить пароль</Button>
                    </Link>
                    <Link href='/' passHref>
                        <Button variant='contained' style={{ width: '250px', marginRight: '10px', backgroundColor: 'rgb(30, 144, 255)' }}>Выход</Button>
                    </Link>
                </Box>
            </AppBar>
            <br/>
        </Box>
    );
}

export default Header;