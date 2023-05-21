import { Box, Button, Table, Typography } from '@mui/material';
import Link from 'next/link';

function createData(
    semester: number,
    course: number,
    name: string,
    examType: string,
    lecturer: string,
    kt1: number,
    kt2: number,
    kt3: number,
    average: number,
    exam: number,
    result: string,
  ) {
    return { semester, course, name, examType, lecturer, kt1, kt2, kt3, average, exam, result };
  }

  const rows = [
    createData(5, 3, 'Информационные технологии', 'Зачёт', 'Михайлов Е. М.', 40, 40, 40, 40, 40, 'Зачтено'),
    createData(5, 3, 'Электродинамика', 'Экзамен', 'Запрягаев С. А.', 25, 32, 42, 33, 33, 'Удовлетворительно'),
    createData(4, 2, 'Механика и оптика', 'Экзамен', 'Киселев Е. А.', 45, 25, 38, 36, 35, 'Хорошо')
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
            <Table
                sx={{ 
                'td':{
                  border: '1px solid black',
                }
               }}>
                <thead>
                    <tr>
                        <th>Семестр</th>
                        <th>Курс</th>
                        <th>Дисциплина</th>
                        <th>Отчётность</th>
                        <th>Преподаватель</th>
                        <th>КТ 1</th>
                        <th>КТ 2</th>
                        <th>КТ 3</th>
                        <th>Средний балл</th>
                        <th>Экзамен</th>
                        <th>Итог</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.name}>
                        <td>{row.semester}</td>
                        <td>{row.course}</td>
                        <td>{row.name}</td>
                        <td>{row.examType}</td>
                        <td>{row.lecturer}</td>
                        <td style={{ fontWeight: 'bold' }}>{row.kt1}</td>
                        <td style={{ fontWeight: 'bold' }}>{row.kt2}</td>
                        <td style={{ fontWeight: 'bold' }}>{row.kt3}</td>
                        <td style={{ fontWeight: 'bold' }}>{row.average}</td>
                        <td style={{ fontWeight: 'bold' }}>{row.exam}</td>
                        <td style={{ fontWeight: 'bold' }}>{row.result}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Box>
        </>
    );
}