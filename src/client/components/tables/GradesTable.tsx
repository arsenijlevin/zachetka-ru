import { Box, Button, Table, Typography } from '@mui/material';
import Link from 'next/link';

function createData(
    name: string,
    kt1: number,
    kt2: number,
    kt3: number,
    kta: number,
    exam: number,
    sf: number,
    result: string,
  ) {
    return { name, kt1, kt2, kt3, kta, exam, sf, result };
  }

  const rows = [
    createData('Иванов А. А.', 25, 25, 25, 25, 25, 50, 'Удовлетворительно'),
    createData('Сидоров П. С.', 50, 50, 50, 50, 50, 100, 'Отлично'),
    createData('Тереньтев Г. Г.', 40, 40, 40, 40, 40, 80, 'Хорошо'),
    createData('Адреев Б. Б.', 45, 45, 45, 45, 45, 90, 'Отлично'),
  ];

export default function GradesTable() {
    return(
        <>
        <Box sx={{ width: '500', position: 'relative', left: '5%' }}>
          <Typography variant='h3'>Учёт успеваемости</Typography>
        </Box>
        <Box sx={{ width: '90%', position: 'fixed', left: '5%' }}>
            <Link href='attendance-table' passHref>
                <Button variant='outlined' style={{ width: '250px', position: 'fixed', right: '5%' }}>Открыть посещаемость</Button>
            </Link>
            <br/>
            <br/>
            <Table
              sx={{ 
                'td':{
                  border: '1px solid black',
                }
               }}>
                <thead>
                  <tr>
                    <th>ФИО студента</th>
                    <th>КТ1</th>
                    <th>КТ2</th>
                    <th>КТ3</th>
                    <th>КТ сред.</th>
                    <th>Экзамен</th>
                    <th>Итоговый балл</th>
                    <th>Итог</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.name}>
                      <td>{row.name}</td>
                      <td>{row.kt1}</td>
                      <td>{row.kt2}</td>
                      <td>{row.kt3}</td>
                      <td>{row.kta}</td>
                      <td>{row.exam}</td>
                      <td>{row.sf}</td>
                      <td>{row.result}</td>
                    </tr>
                  ))}
                </tbody>
            </Table>
        </Box>
        </>
    );
}