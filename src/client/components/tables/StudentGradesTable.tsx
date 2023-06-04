import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import CodeCheckPopUp from 'components/pop-ups/CodeCheckPopUp';
import Link from 'next/link';
import React from 'react';



export default function StudentGradesTable() {
    const [isPopupOpen, setIsPopupOpen] = React.useState(0);
    const modals = [null, CodeCheckPopUp];
    const handleOpenCodeCheck = () => setIsPopupOpen(1);
    const SelectedModal = modals[isPopupOpen];
    const rows: GridRowsProp = [
        { id: 1, col1: 5, col2: 3, col3: 'Информационные технологии', col4: 'Зачёт', col5: 'Михайлов Е. М.', col6: 40, col7: 40, col8: 40, col9: 40, col10: 40, col11: 'Зачтено' },
        { id: 2, col1: 5, col2: 3, col3: 'Электродинамика', col4: 'Экзамен', col5: 'Запрягаев С. А.', col6: 25, col7: 32, col8: 42, col9: 33, col10: 33, col11: 'Удовлетворительно' },
        { id: 3, col1: 4, col2: 2, col3: 'Механика и оптика', col4: 'Экзамен', col5: 'Киселев Е. А.', col6: 45, col7: 25, col8: 38, col9: 36, col10: 35, col11: 'Хорошо' }
    ];

    let columns: GridColDef[] = [
        { field: 'col1', headerName: 'Семестр', flex: 0.05, editable: false, minWidth: 100 },
        { field: 'col2', headerName: 'Курс', flex: 0.05, minWidth: 100 },
        { field: 'col3', headerName: 'Дисциплина', flex: 0.2, minWidth: 400 },
        { field: 'col4', headerName: 'Отчётность', flex: 0.1, minWidth: 100 },
        { field: 'col5', headerName: 'Преподаватель', flex: 0.15, minWidth: 120 },
        { field: 'col6', headerName: 'КТ 1', flex: 0.05, minWidth: 100 },
        { field: 'col7', headerName: 'КТ 2', flex: 0.05, minWidth: 100 },
        { field: 'col8', headerName: 'КТ 3', flex: 0.05, minWidth: 100 },
        { field: 'col9', headerName: 'Средний балл', flex: 0.1, minWidth: 100 },
        { field: 'col10', headerName: 'Экзамен', flex: 0.1, minWidth: 100 },
        { field: 'col11', headerName: 'Итог', flex: 0.1, minWidth: 160 }
    ];

    columns = columns.map(column => ({
        disableColumnMenu: true,
        sortable: false,
        ...column
    }))


    return (
        <>
            <Box sx={{ width: '90%', margin: "0 auto" }}>
                <Box>
                    <Typography variant='h3'>Моя успеваемость</Typography>
                </Box>
                <Box display={'flex'} alignItems={'end'} marginY={4}>
                    <Box flex={0.51} height={'100%'}>
                        <Typography variant='h5'>
                            Иванов Иван Иванович
                        </Typography>
                    </Box>
                    <Box flex={0.49} display={'flex'} gap={5}>
                        <Button variant='outlined' style={{ width: "100%" }} onClick={handleOpenCodeCheck}>Код посещаемости</Button>
                        <Link href='schedule-table' passHref style={{ flex: 1 }}>
                            <Button variant='outlined' style={{ width: "100%" }}>Открыть расписание</Button>
                        </Link>
                    </Box>
                </Box>

                <DataGrid rows={rows} columns={columns} hideFooter={true} showColumnVerticalBorder />
            </Box>
            {SelectedModal ? <SelectedModal open={true} setOpen={setIsPopupOpen} /> : <></>}
        </>
    );
}