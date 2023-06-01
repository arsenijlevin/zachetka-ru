import { Box, Typography } from '@mui/material';
import Link from 'next/link';

const list = [
    'Технологии программирования (6 семестр)'
];

function SubjectsList() {
    
    return(
        <>
        <Box sx={{ position: 'relative', left: '5%', width: '90%' }}>
            <Typography variant='h3'>Выберите дисциплину</Typography>
            <br />
            <br />
            {list.map((item) => (
                <Link href='groups-list' passHref style={{ textDecoration: 'underline', color: '#1E90FF', fontSize: '20px' }}>{item}</Link>
            ))}
        </Box>
        </>
    )
}

export default SubjectsList;