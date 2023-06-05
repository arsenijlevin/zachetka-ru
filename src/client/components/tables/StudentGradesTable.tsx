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

    /*
    2022-2023	6	3	Информационные технологии (Б1.О.22)	Экзамен	Вахтин А. А.	40	25	34	33				
2022-2023	6	3	Инфокоммуникационные системы и сети (Б1.О.23)	Экзамен	Коваль А. С.	43	38						
2022-2023	6	3	Технологии программирования (Б1.О.24)	Экзамен	Тарасов В. С.	35	37						
2022-2023	6	3	Квантовая теория (Б1.О.32)	Экзамен	Запрягаев С. А.	32	37	34	34				
2022-2023	6	3	Информационно-поисковые системы (Б1.В.05)	Зачёт	Сычев А. В.	19	50		—	—	—		
2022-2023	6	3	Обработка изображений (Б1.В.06)	Зачёт с оценкой	Фертиков В. В.	45	20			—			
2022-2023	6	3	Параллельные алгоритмы обработки данных (Б1.В.ДВ.04.01)	Зачёт с оценкой	Фертиков В. В.	35	9			—			
2022-2023	6	3	Технологии интернет вещей (Б1.В.ДВ.05.01)	Зачёт	Зуев С. А.	30	30
    */
    const rows: GridRowsProp = [
        { id: 1, col1: 6, col2: 3, col3: 'Информационные технологии', col4: 'Экзамен', col5: 'Вахтин А. А.', col6: 40, col7: 40, col8: 40, col9: 40, col10: 40, col11: 'Хорошо' },
        { id: 2, col1: 6, col2: 3, col3: 'Инфокоммуникационные системы и сети', col4: 'Экзамен', col5: 'Коваль А. С.', col6: 25, col7: 32, col8: 42, col9: 33, col10: 33, col11: 'Удовлетворительно' },
        { id: 3, col1: 6, col2: 3, col3: 'Технологии программирования ', col4: 'Экзамен', col5: 'Тарасов В. С.', col6: 45, col7: 25, col8: 38, col9: 36, col10: 35, col11: 'Хорошо' },
        { id: 4, col1: 6, col2: 3, col3: 'Квантовая теория', col4: 'Экзамен', col5: 'Запрягаев С. А.', col6: 25, col7: 25, col8: 25, col9: 25, col10: 25, col11: 'Удовлетворительно' },
        { id: 5, col1: 6, col2: 3, col3: 'Информационно-поисковые системы', col4: 'Зачёт', col5: 'Сычев А. В.', col6: 35, col7: 35, col8: 35, col9: 35, col10: '-', col11: 'Зачтено' },
        { id: 6, col1: 6, col2: 3, col3: 'Обработка изображений', col4: 'Зачёт с оценкой', col5: 'Фертиков В. В.', col6: 36, col7: 35, col8: 37, col9: 36, col10: '-', col11: 'Хорошо' },
        { id: 7, col1: 6, col2: 3, col3: 'Механика и оптика', col4: 'Зачёт с оценкой', col5: 'Фертиков В. В.', col6: 40, col7: 40, col8: 40, col9: 40, col10: '-', col11: 'Хорошо' },
        { id: 8, col1: 6, col2: 3, col3: 'Технологии интернет вещей', col4: 'Зачёт', col5: 'Зуев С. А.', col6: 30, col7: 30, col8: 0, col9: 20, col10: '-', col11: 'Незачтено' }

    ];

    let columns: GridColDef[] = [
        { field: 'col1', headerName: 'Семестр', flex: 0.05, minWidth: 80 },
        { field: 'col2', headerName: 'Курс', flex: 0.05, minWidth: 40 },
        { field: 'col3', headerName: 'Дисциплина', flex: 0.2, minWidth: 300 },
        { field: 'col4', headerName: 'Отчётность', flex: 0.13, minWidth: 100 },
        { field: 'col5', headerName: 'Преподаватель', flex: 0.15, minWidth: 120 },
        { field: 'col6', headerName: 'КТ 1', flex: 0.05, minWidth: 50 },
        { field: 'col7', headerName: 'КТ 2', flex: 0.05, minWidth: 50 },
        { field: 'col8', headerName: 'КТ 3', flex: 0.05, minWidth: 50 },
        { field: 'col9', headerName: 'Средний балл', flex: 0.1, minWidth: 150 },
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