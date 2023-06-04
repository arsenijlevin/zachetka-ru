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

let columns: GridColDef[] = [
  { field: 'col2', headerName: '1.12\n15:00', width: 100, editable: true, },
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

const marks = ["", "", "", "", "", "", "", "", "", "Н", "Б", "П"];

const getRandomMark = (items: string[]) => items[Math.floor(Math.random() * items.length)];


columns = columns.map(column => ({
  disableColumnMenu: true,
  sortable: false,
  ...column
}))

const names = [
  "Головина М. А.",
  "Петров А. Е.",
  "Гусева И. М.",
  "Петровская А. М.",
  "Панова В. М.",
  "Жукова А. А.",
  "Александрова В. К.",
  "Калинин И. И.",
  "Андреева Е. Д.",
  "Спиридонова А. А.",
  "Еремина О. И.",
  "Иванова С. С.",
  "Ситникова В. М.",
  "Баранов С. Т.",
  "Чернышева В. В.",
  "Антонов М. Ю.",
  "Белов А. М.",
  "Осипов М. А.",
  "Маркин Б. М.",
  "Филиппова К. А.",
  "Носкова В. К.",
  "Усов А. С.",
  "Афанасьев Д. Т.",
  "Васильева В. Г.",
  "Козлова В. С."
]

const entryRows = () => columns.map((column, index) => ([
  `col${index + 1}`, getRandomMark(marks),
]));

const rows = names.map((name, index) => {
  const row: GridRowsProp = Object.fromEntries(entryRows());
  return {
    id: index,
    ...row
  }
})

const firstRows: GridRowsProp = names.map((name, index) => ({
  id: index,
  col1: name
}))

const firstColumns: GridColDef[] = [
  { field: 'col1', headerName: 'ФИО студента', flex: 1, sortable: false, disableColumnMenu: true },
];

const lastRows: GridRowsProp = rows.map((row, index) => ({
  id: index,
  col1: Object.values(row).filter(value => typeof value === "string" && value === "Н").length,
  col2: Object.values(row).filter(value => typeof value === "string" && value === "П").length,
  col3: Object.values(row).filter(value => typeof value === "string" && value === "Б").length,
  col4: Object.values(row).filter(value => typeof value === "string" && (value === "Н" || value === "П" || value === "Б")).length,
}));

const lastColumns: GridColDef[] = [
  { field: 'col1', headerName: 'Н', flex: 0.15, maxWidth: 75, sortable: false, disableColumnMenu: true },
  { field: 'col2', headerName: 'П', flex: 0.15, maxWidth: 75, sortable: false, disableColumnMenu: true },
  { field: 'col3', headerName: 'Б', flex: 0.15, maxWidth: 75, sortable: false, disableColumnMenu: true },
  { field: 'col4', headerName: 'Сумма \n пропусков', flex: 0.55, maxWidth: 150, sortable: false, disableColumnMenu: true },
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
    <Box width={'90%'} marginX={'auto'} display={'flex'} flexDirection={'column'} gap={2}>
      <Box>
        <Typography variant='h3'>Учёт посещаемости</Typography>
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <Box flex={1}>
          <Breadcrumbs aria-label="breadcrumb" style={{ color: '#1E90FF', fontSize: '20px' }}>
            <Link className='hover:underline-offset-1 hover:text-blue-700 text-blue-500' href='subjects-list'>{subject}</Link>
            <Link className='hover:underline-offset-1 hover:text-blue-700 text-blue-500' href='groups-list'>{group}</Link>
            <Link className='hover:underline-offset-1 hover:text-blue-700 text-blue-500' href='attendance-table'>Учёт посещаемости</Link>
          </Breadcrumbs>
        </Box>
        <Box>
          <Link href='grades-table' passHref>
            <Button variant='outlined'>Открыть оценки</Button>
          </Link>
        </Box>
      </Box>
      <Box>
        <Typography variant='h5'>Общее количество занятий: 20</Typography>
      </Box>
      <Box display={"flex"}>
        <Box flex={0.2}>
          <DataGrid rows={firstRows} columns={firstColumns} hideFooter={true}
            sx={{
              borderRadius: '0px',
              borderBottom: '0',
            }} />
        </Box>
        <Box flex={0.6} maxWidth={'60%'}>
          <DataGrid showColumnVerticalBorder rows={rows} columns={columns} hideFooter={true} processRowUpdate={processRowUpdate}
            sx={{
              '.MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold !important',
              },
              '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                width: '0.4em',
              },
              '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
                background: '#f1f1f1',
              },
              '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
              },
              '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover': {
                background: '#555',
              },
              "& .MuiDataGrid-cell": {
                borderRight: 1,
                borderRightColor: 'rgb(220,220,220)'
              },
              borderRadius: '0px',
              borderLeft: '0px',
            }
            }
          />
        </Box>
        <Box flex={0.2}>
          <DataGrid rows={lastRows} columns={lastColumns} hideFooter={true}
            sx={{
              borderRadius: '0px',
              borderLeft: '0',
              borderBottom: '0',
            }} />
        </Box>
      </Box>
    </Box >
  );
}
