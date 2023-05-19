import { Box, Button, Table, Typography } from '@mui/material';
import * as React from 'react';
import Link from 'next/link';

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

function createData(
  name: string,
  attendance: string[],
  n: number,
  p: number,
  b: number,
  sum: number,
) {
  return { name, attendance, n, p, b, sum };
}

const dates = [
  '1.12\n15:00', '2.12\n8:00', '6.12\n8:00', '7.12\n8:00', '7.12\n8:00', '10.12\n15:00', '11.12\n8:00', '20.12\n8:00', '21.12\n8:00', '22.12\n8:00',
  '1.12\n15:00', '2.12\n8:00', '6.12\n8:00', '7.12\n8:00', '7.12\n8:00', '10.12\n15:00', '11.12\n8:00', '20.12\n8:00', '21.12\n8:00', '22.12\n8:00'
]

const rows = [
  createData('Иванов А. А.', ['', 'Н', '', '', '', '', 'Н', '', '', '', 'П', '', 'П', '', 'Б', 'П', '', 'П', '', 'Б'], 0, 0, 0, 1),
  createData('Сидоров П. С.', ['', 'Б', '', 'Б', 'Б', '', 'Н', '', '', '', 'П', '', 'П', '', 'Б', 'П', '', 'П', '', 'Б'], 0, 0, 0, 2),
  createData('Тереньтев Г. Г.', ['', '', 'Н', 'Б', 'Б', 'П', '', 'П', '', 'Б', 'П', '', 'П', '', 'Б', 'П', '', 'П', '', 'Б'], 0, 0, 0, 3),
  createData('Адреев Б. Б.', ['П', '', 'П', '', 'Б', 'П', '', 'П', '', 'Б', 'П', '', 'П', '', 'Б', 'П', '', 'П', '', 'Б'], 0, 0, 0, 4),
];

export default function AttendanceTable() {
  return (
    <Box sx={{ width: '2000px' }}>
      <Typography variant='h3'>Учёт посещаемости</Typography>
      <Link href='grades-table' passHref>
        <Button variant='outlined' style={{ width: '200px', position: 'fixed', right: 0 }}>Открыть оценки</Button>
      </Link>
      <br />
      <Typography variant='h5' style={{ width: '400px', position: 'sticky', left: 0 }}>Общее количество занятий: {dates.length}</Typography>
      <br />
      <Table
        sx={{
          '& tr > *:first-child': {
            border: '1px solid black',
            position: 'sticky',
            left: 0,
            backgroundColor: '#e0e0e0',
          },
          'td': {
            border: '1px solid black',
            padding: '10px',
            background: 'white',
          },
          'tbody td.stuck': {
            position: 'sticky',
            right: 0,
            backgroundColor: 'white',
          },
          'tr td:nth-last-child(1)': {
            position: 'sticky',
            right: 0,
            backgroundColor: '#e0e0e0',
          },
          'tr td:nth-last-child(2)': {
            position: 'sticky',
            right: 120,
            backgroundColor: '#e0e0e0',
          },
          'tr td:nth-last-child(3)': {
            position: 'sticky',
            right: 220,
            backgroundColor: '#e0e0e0',
          },
          'tr td:nth-last-child(4)': {
            position: 'sticky',
            right: 320,
            backgroundColor: '#e0e0e0',
          },
          'tr th:nth-last-child(1),': {
            position: 'sticky',
            right: 0,
            backgroundColor: '#e0e0e0',
            textAlign: 'left',
          },
          'tr th:nth-last-child(2),': {
            position: 'sticky',
            right: 120,
            backgroundColor: '#e0e0e0',
          },
          'tr th:nth-last-child(3),': {
            position: 'sticky',
            right: 220,
            backgroundColor: '#e0e0e0',
          },
          'tr th:nth-last-child(4),': {
            position: 'sticky',
            right: 320,
            backgroundColor: '#e0e0e0',
          }
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 100 }}>Ф.И.О. студента</th>
            {dates.map((date) => (
                <th style={{ width: 50 }}>{date}</th>
              ))}
            <th style={{ width: 100 }}>Н</th>
            <th style={{ width: 100 }}>П</th>
            <th style={{ width: 100 }}>Б</th>
            <th style={{ width: 100 }}>Сумма пропусков</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              {row.attendance.map((a) => (
                <td>{a}</td>
              ))}
              <td className="stuck">{row.n}</td>
              <td className="stuck">{row.b}</td>
              <td className="stuck">{row.p}</td>
              <td className="stuck">{row.sum}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}
