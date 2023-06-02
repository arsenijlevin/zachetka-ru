import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';

  const rows: GridRowsProp = [
    { id: 1, col1: 5, col2: 3, col3: 'Информационные технологии', col4: 'Зачёт', col5: 'Михайлов Е. М.', col6: 40, col7: 40, col8: 40, col9: 40, col10: 40, col11: 'Зачтено' },
    { id: 2, col1: 5, col2: 3, col3: 'Электродинамика', col4: 'Экзамен', col5: 'Запрягаев С. А.', col6: 25, col7: 32, col8: 42, col9: 33, col10: 33, col11: 'Удовлетворительно' },
    { id: 3, col1: 4, col2: 2, col3: 'Механика и оптика', col4: 'Экзамен', col5: 'Киселев Е. А.', col6: 45, col7: 25, col8: 38, col9: 36, col10: 35, col11: 'Хорошо' }
  ];
  
  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Семестр', flex: 0.05  },
    { field: 'col2', headerName: 'Курс', flex: 0.05 },
    { field: 'col3', headerName: 'Дисциплина', flex: 0.2 },
    { field: 'col4', headerName: 'Отчётность', flex: 0.08 },
    { field: 'col5', headerName: 'Преподаватель', flex: 0.2 },
    { field: 'col6', headerName: 'КТ 1', flex: 0.05 },
    { field: 'col7', headerName: 'КТ 2', flex: 0.05 },
    { field: 'col8', headerName: 'КТ 3', flex: 0.05 },
    { field: 'col9', headerName: 'Средний балл', flex: 0.1 },
    { field: 'col10', headerName: 'Экзамен', flex: 0.1 },
    { field: 'col11', headerName: 'Итог', flex: 0.15 }
  ];

export default function StudentGradesTable(){
    return(
        <>
        <Box sx={{ width: '500px', position: 'relative', left: '5%' }}>
            <Typography variant='h3'>Моя успеваемость</Typography>
        </Box>
        <Box sx={{ width: '90%', position: 'fixed', left: '5%' }}>
            <Link href='student-grades-table' passHref>
                <Button variant='outlined' style={{ width: '250px', position: 'fixed', right: '350px' }}>Код посещаемости</Button>
            </Link>
            <Link href='schedule-table' passHref>
                <Button variant='outlined' style={{ width: '250px', position: 'fixed', right: '5%' }}>Открыть расписание</Button>
            </Link>
            <br/>
            <br/>
            <DataGrid rows={rows} columns={columns} hideFooter={true}
                sx={{
                '.MuiDataGrid-columnHeaderTitle': { 
                fontWeight: 'bold !important',
                },
                "& .MuiDataGrid-cell": {
                    borderRight: 1,
                    borderRightColor: 'rgb(220,220,220)',
                    borderLeft: 1,
                    borderLeftColor: 'rgb(220,220,220)',
                },
                borderRadius: '0px',
                borderLeft: '0px',
                }}/>
        </Box>
        </>
    );
}