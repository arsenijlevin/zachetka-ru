import { Box, Breadcrumbs, Typography } from '@mui/material';
import Link from 'next/link';

interface SubjectsListProps {
    subjects: string[]
}

function SubjectsList({ subjects }: SubjectsListProps) {

    return (
        <Box width={'90%'} marginX={'auto'} display={'flex'} flexDirection={'column'} gap={2}>
            <Box>
                <Typography variant='h3'>Выберите дисциплину</Typography>
            </Box>
            <Box display={'flex'}>
                {subjects.map((item, index) => (
                    <Breadcrumbs key={index} aria-label="breadcrumb">
                        <Link href='/groups-list' passHref style={{ color: '#1E90FF', fontSize: '20px' }}>{item}</Link>
                    </Breadcrumbs>
                ))}
            </Box>
        </Box >
    )
}

export default SubjectsList;