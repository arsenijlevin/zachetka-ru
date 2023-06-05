import { Box, Breadcrumbs, Button, Typography } from '@mui/material';
import AttendanceCheckPopUp from '../pop-ups/AttendanceCheckPopUp';
import Link from 'next/link';
import React from 'react';


interface GroupsListProps {
    subject: string,
    groups: string[]
}

function GroupsList({ subject, groups }: GroupsListProps) {
    const [isPopupOpen, setIsPopupOpen] = React.useState(0);
    const modals = [null, AttendanceCheckPopUp];
    const handleOpenAttendanceCheck = () => setIsPopupOpen(1);
    const SelectedModal = modals[isPopupOpen];

    return (
        <>
            <Box width={'90%'} marginX={'auto'} display={'flex'} flexDirection={'column'} gap={2}>
                <Box>
                    <Typography variant='h3'>Выберите группу</Typography>
                </Box>
                <Box display={'flex'}>
                    <Box flex={1}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link className='hover:underline-offset-1 hover:text-blue-700 text-blue-500' style={{ color: '#1E90FF', fontSize: '20px' }} href='subjects-list'>
                                {subject}
                            </Link>
                        </Breadcrumbs>
                    </Box>
                    <Box>
                        <Button variant='outlined' onClick={handleOpenAttendanceCheck}>Проверка посещаемости</Button>
                    </Box>
                </Box>
                <Box>
                    <Box display={'flex'} flexDirection={'column'} gap={4}>
                        {groups.map((item, index) => (
                            <Link key={index} href='/attendance-table' passHref style={{ color: '#1E90FF', fontSize: '20px' }}>{item}</Link>
                        ))}
                    </Box>
                </Box>
                {SelectedModal ? <SelectedModal open={true} setOpen={setIsPopupOpen} /> : <></>}
            </Box>
        </>
    )
}

export default GroupsList;