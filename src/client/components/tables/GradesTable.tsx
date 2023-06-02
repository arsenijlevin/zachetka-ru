import { Box, Breadcrumbs, Button, Typography } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';

const subject ='Технологии программирования (6 семестр)';
const group = 'Группа 1';

const rows: GridRowsProp = [
  { id: 1, col1: 'Иванов А. А.', col2: 25, col3: 25, col4: 25, col5: 25, col6: 25, col7: 50, col8: 'Удовлетворительно' },
  { id: 2, col1: 'Сидоров П. С.', col2: 50, col3: 50, col4: 50, col5: 50, col6: 50, col7: 100, col8: 'Отлично' },
  { id: 3, col1: 'Тереньтев Г. Г.', col2: 40, col3: 40, col4: 40, col5: 40, col6: 40, col7: 80, col8: 'Хорошо' },
  { id: 4, col1: 'Адреев Б. Б.', col2: 45, col3: 45, col4: 45, col5: 45, col6: 45, col7: 90, col8: 'Отлично' },
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'ФИО студента', width: 200  },
  { field: 'col2', headerName: 'КТ1', width: 150, editable: true },
  { field: 'col3', headerName: 'КТ2', width: 150, editable: true },
  { field: 'col4', headerName: 'КТ3', width: 150, editable: true },
  { field: 'col5', headerName: 'КТ сред.', width: 150 },
  { field: 'col6', headerName: 'Экзамен', width: 150, editable: true },
  { field: 'col7', headerName: 'Итоговый балл', width: 150 },
  { field: 'col8', headerName: 'Итог', width: 200 },
];

export default function GradesTable() {
    return(
        <>
        <Box sx={{ width: '500px', position: 'relative', left: '5%' }}>
          <Typography variant='h3'>Учёт успеваемости</Typography>
        </Box>
        <Box sx={{ width: '90%', position: 'fixed', left: '5%' }}>
            <Link href='attendance-table' passHref>
                <Button variant='outlined' style={{ width: '250px', position: 'fixed', right: '5%' }}>Открыть посещаемость</Button>
            </Link>
            <br/>
            <Breadcrumbs aria-label="breadcrumb">
              <Link className='underline hover:underline-offset-1 hover:text-blue-700 text-blue-500' href='subjects-list'>{subject}</Link>
              <Link className='underline hover:underline-offset-1 hover:text-blue-700 text-blue-500' href='groups-list'>{group}</Link>
              <Link className='underline hover:underline-offset-1 hover:text-blue-700 text-blue-500' href='attendance-table'>Учёт успеваемости</Link>
            </Breadcrumbs>
            <br/>
            <DataGrid rows={rows} columns={columns} sx={{
              '.MuiDataGrid-columnHeaderTitle': { 
                fontWeight: 'bold !important',
              }
            }}/>
        </Box>
        </>
    );
}