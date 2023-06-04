import { Box, Breadcrumbs, Button, Typography } from '@mui/material';
import Link from 'next/link';


interface GroupsListProps {
    subject: string,
    groups: string[]
}

function GroupsList({ subject, groups }: GroupsListProps) {

    return (
        <>
            <Box sx={{ position: 'relative', left: '5%', width: '90%' }}>
                <Typography variant='h3'>Выберите группу</Typography>
                <Button variant='outlined' style={{ width: '250px', position: 'fixed', right: '5%' }}>Проверка посещаемости</Button>
                <br />
                <Breadcrumbs aria-label="breadcrumb">
                    <Link className='underline hover:underline-offset-1 hover:text-blue-700 text-blue-500' href='subjects-list'>{subject}</Link>

                </Breadcrumbs>
                <br />
                <Box className="flex flex-col gap-4">
                    {groups.map((item, index) => (
                        <Link key={index} href='attendance-table' passHref style={{ textDecoration: 'underline', color: '#1E90FF', fontSize: '20px' }}>{item}</Link>
                    ))}
                </Box>
            </Box>
        </>
    )
}

export default GroupsList;