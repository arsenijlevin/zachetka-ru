import { Box, Button, Table } from '@mui/material';
import * as React from 'react';

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
  n: number,
  p: number,
  b: number,
  sum: number,
) {
  return { name, n, p, b, sum };
}

const rows = [
  createData('1', 159, 6.0, 24, 4.0),
  createData('2', 237, 9.0, 37, 4.3),
  createData('3', 262, 16.0, 24, 6.0),
  createData('4', 305, 3.7, 67, 4.3),
];

export default function AttendanceTable() {
  return (
    <Box sx={{ width: '3000px' }}>
      <Table
        sx={{
          '& tr > *:first-child': {
            position: 'sticky',
            left: 0,
            backgroundColor: '#555',
          },
          '& tr > *:last-child': {
            position: 'sticky',
            right: 0,
            backgroundColor: '#555',
          },
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 50 }}>Row</th>
            <th style={{ width: 200 }}>Calories</th>
            <th style={{ width: 200 }}>Fat&nbsp;(g)</th>
            <th style={{ width: 200 }}>Carbs&nbsp;(g)</th>
            <th style={{ width: 200 }}>Protein&nbsp;(g)</th>
            <th aria-label="last" style={{ width: 50 }} />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.n}</td>
              <td>{row.b}</td>
              <td>{row.p}</td>
              <td>{row.sum}</td>
              <td>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}
