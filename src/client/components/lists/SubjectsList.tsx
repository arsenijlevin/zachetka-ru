import { Box, Typography } from '@mui/material';
import Link from 'next/link';

interface SubjectsListProps {
    subjects: string[]
}

function SubjectsList({ subjects }: SubjectsListProps) {

    return (
        <>
            <Box sx={{ position: 'relative', left: '5%', width: '90%' }}>
                <Typography variant='h3'>Выберите дисциплину</Typography>
                <br />
                <br />
                {subjects.map((item, index) => (
                    <Link key={index} href='/groups-list' passHref style={{ textDecoration: 'underline', color: '#1E90FF', fontSize: '20px' }}>{item}</Link>
                ))}
            </Box>
        </>
    )
}

export default SubjectsList;