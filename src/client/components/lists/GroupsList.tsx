import { Box, Breadcrumbs, Button, Typography } from '@mui/material';
import AttendanceCheckPopUp from 'components/pop-ups/AttendanceCheckPopUp';
import Link from 'next/link';
import React from 'react';


const list = [
    '1 группа', '2 группа', '3 группа', '4 группа'
];

const subject = 'Технологии программирования (6 семестр)';

function GroupsList() {
    const [isPopupOpen, setIsPopupOpen] = React.useState(0);
    const modals = [null, AttendanceCheckPopUp];
    const handleOpenAttendanceCheck = () => setIsPopupOpen(1);
    const SelectedModal = modals[isPopupOpen];

    return(
        <>
        <Box sx={{ position: 'relative', left: '5%', width: '90%' }}>
            <Typography variant='h3'>Выберите группу</Typography>
            <Button variant='outlined' style={{ width: '250px', position: 'fixed', right: '5%' }} onClick={handleOpenAttendanceCheck} >Проверка посещаемости</Button>
            <br />
            <Breadcrumbs aria-label="breadcrumb">
                <Link className='underline hover:underline-offset-1 hover:text-blue-700 text-blue-500' href='subjects-list'>{subject}</Link><></>
            </Breadcrumbs>
            <br />
            <Box className="flex flex-col gap-4">
                {list.map((item) => (
                    <Link href='attendance-table' passHref style={{ textDecoration: 'underline', color: '#1E90FF', fontSize: '20px' }}>{item}</Link>
                ))}
            </Box>
        </Box>
        {SelectedModal ? <SelectedModal open={true} setOpen={setIsPopupOpen}/> : <></>}
        </>
    );
}

export default GroupsList;