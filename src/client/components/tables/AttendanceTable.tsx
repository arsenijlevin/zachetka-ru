import { Box, Breadcrumbs, Button, Typography } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef, GridRowModel } from '@mui/x-data-grid';
import * as React from 'react';
import Link from 'next/link';
import { useCallback } from 'react';

// function createData(
//   name: string,
//   attendance: string[],
//   n: number,
//   p: number,
//   b: number,
//   sum: number,
// ) {
//   return { name, attendance, n, p, b, sum };
// }

const subject = 'Технологии программирования (6 семестр)';
const group = 'Группа 1';

/* function createData(
  name: string,
  attendance: string[],
  n: number,
  p: number,
  b: number,
  sum: number,
) {
  return { name, attendance, n, p, b, sum };
} */

const rows: GridRowsProp = [
  { id: 1, col2: '', col3: 'Н', col4: '', col5: '', col6: '', col7: '', col8: 'Н', col9: '', col10: '', col11: '', col12: 'П', col13: '', col14: 'П', col15: '', col16: 'Б', col17: 'П', col18: '', col19: 'П', col20: '', col21: 'Б', col22: 2, col23: 4, col24: 2, col25: 8 },
  { id: 2, col2: '', col3: 'Н', col4: '', col5: '', col6: '', col7: '', col8: 'Н', col9: '', col10: '', col11: '', col12: 'П', col13: '', col14: 'П', col15: '', col16: 'Б', col17: 'П', col18: '', col19: 'П', col20: '', col21: 'Б', col22: 2, col23: 4, col24: 2, col25: 8 },
  { id: 3, col2: '', col3: 'Н', col4: '', col5: '', col6: '', col7: '', col8: 'Н', col9: '', col10: '', col11: '', col12: 'П', col13: '', col14: 'П', col15: '', col16: 'Б', col17: 'П', col18: '', col19: 'П', col20: '', col21: 'Б', col22: 2, col23: 4, col24: 2, col25: 8 },
  { id: 4, col2: '', col3: 'Н', col4: '', col5: '', col6: '', col7: '', col8: 'Н', col9: '', col10: '', col11: '', col12: 'П', col13: '', col14: 'П', col15: '', col16: 'Б', col17: 'П', col18: '', col19: 'П', col20: '', col21: 'Б', col22: 2, col23: 4, col24: 2, col25: 8 },
];

const columns: GridColDef[] = [
  { field: 'col2', headerName: '1.12\n15:00', width: 100, editable: true },
  { field: 'col3', headerName: '2.12\n8:00', width: 100, editable: true },
  { field: 'col4', headerName: '6.12\n8:00', width: 100, editable: true },
  { field: 'col5', headerName: '7.12\n8:00', width: 100, editable: true },
  { field: 'col6', headerName: '7.12\n8:00', width: 100, editable: true },
  { field: 'col7', headerName: '10.12\n15:00', width: 100, editable: true },
  { field: 'col8', headerName: '11.12\n8:00', width: 100, editable: true },
  { field: 'col9', headerName: '20.12\n8:00', width: 100, editable: true },
  { field: 'col10', headerName: '21.12\n8:00', width: 100, editable: true },
  { field: 'col11', headerName: '22.12\n8:00', width: 100, editable: true },
  { field: 'col12', headerName: '1.12\n15:00', width: 100, editable: true },
  { field: 'col13', headerName: '2.12\n8:00', width: 100, editable: true },
  { field: 'col14', headerName: '6.12\n8:00', width: 100, editable: true },
  { field: 'col15', headerName: '7.12\n8:00', width: 100, editable: true },
  { field: 'col16', headerName: '7.12\n8:00', width: 100, editable: true },
  { field: 'col17', headerName: '10.12\n15:00', width: 100, editable: true },
  { field: 'col18', headerName: '11.12\n8:00', width: 100, editable: true },
  { field: 'col19', headerName: '20.12\n8:00', width: 100, editable: true },
  { field: 'col20', headerName: '21.12\n8:00', width: 100, editable: true },
  { field: 'col21', headerName: '22.12\n8:00', width: 100, editable: true },
];

const firstRows: GridRowsProp = [
  { id: 1, col1: 'Иванов А. А.' },
  { id: 2, col1: 'Иванов А. А.' },
  { id: 3, col1: 'Иванов А. А.' },
  { id: 4, col1: 'Иванов А. А.' },
];

const firstColumns: GridColDef[] = [
  { field: 'col1', headerName: 'ФИО студента', width: 150 },
];

const lastRows: GridRowsProp = [
  { id: 1, col1: 2, col2: 4, col3: 2, col4: 8 },
  { id: 2, col1: 3, col2: 4, col3: 2, col4: 8 },
  { id: 3, col1: 1, col2: 4, col3: 2, col4: 8 },
  { id: 4, col1: 0, col2: 4, col3: 2, col4: 8 },
];

const lastColumns: GridColDef[] = [
  { field: 'col1', headerName: 'Н', width: 50 },
  { field: 'col2', headerName: 'П', width: 50 },
  { field: 'col3', headerName: 'Б', width: 50 },
  { field: 'col4', headerName: 'Сумма \n пропусков', width: 150 },
];



/* const useFakeMutation = () => {
  return React.useCallback(
    (user: Partial<User>) =>
      new Promise<Partial<User>>((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject(new Error("Error while saving user: name can't be empty."));
          } else {
            resolve({ ...user, name: user.name?.toUpperCase() });
          }
        }, 200);
      }),
    [],
  );
};
*/

export default function AttendanceTable() {
  const processRowUpdate = useCallback(
    (newRow: GridRowModel, oldRow: GridRowModel) => {
      // Make the HTTP request to save in the backend
      // const response = await mutateRow(newRow);
      console.log(newRow);
      return newRow;
    },
    [],
  );

  return (
    <Box sx={{ width: '2000px' }}>
      <Typography variant='h3' position={'sticky'} left={'5%'} width={'500px'}>Учёт посещаемости</Typography>
      <Link href='grades-table' passHref>
        <Button variant='outlined' style={{ width: '200px', position: 'fixed', right: '5%' }}>Открыть оценки</Button>
      </Link>
      <br />
      <Box sx={{ position: 'sticky', left: '5%', width: '600px' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link className='underline hover:underline-offset-1 hover:text-blue-700 text-blue-500' href='subjects-list'>{subject}</Link>
          <Link className='underline hover:underline-offset-1 hover:text-blue-700 text-blue-500' href='groups-list'>{group}</Link>
          <Link className='underline hover:underline-offset-1 hover:text-blue-700 text-blue-500' href='attendance-table'>Учёт посещаемости</Link>
        </Breadcrumbs>
      </Box>
      <br />
      <Typography variant='h5' style={{ width: '400px', position: 'sticky', left: '5%' }}>Общее количество занятий: 20</Typography>
      <br />
      <Box sx={{ position: 'fixed', left: '5%', width: '90%' }}>
        <Box sx={{ position: 'fixed', left: '5%', width: '10%' }}>
          <DataGrid rows={firstRows} columns={firstColumns} hideFooter={true}
          sx={{
            borderRadius: '0px',
          }}/>     
        </Box>
        <Box sx={{ position: 'fixed', left: '15%', width: '60%' }}>
          <DataGrid rows={rows} columns={columns} hideFooter={true} processRowUpdate={processRowUpdate}
          sx={{
            '.MuiDataGrid-columnHeaderTitle': { 
              fontWeight: 'bold !important',
              },
              "& .MuiDataGrid-cell": {
                borderRight: 1,
                borderRightColor: 'rgb(220,220,220)'
              },
              borderRadius: '0px',
              borderLeft: '0px',
            }}
            />
        </Box>
        <Box sx={{ position: 'fixed', right: '5%', width: '20%' }}>
          <DataGrid rows={lastRows} columns={lastColumns} hideFooter={true}
          sx={{
            borderRadius: '0px',
          }}/>
        </Box>
      </Box>
    </Box>
  );
}
