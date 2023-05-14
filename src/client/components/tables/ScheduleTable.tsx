import { Box, Button, Table, Typography } from '@mui/material';
import Link from 'next/link';

function createData(
    dataEntry: string,
    attendance: string
) {
    return { dataEntry, attendance };
}

const data = [
    createData('Технологии интернет вещей Зуев С. А. 307п', 'Н'),
    createData('Обработка изображений Фертиков В. В. 297', ''),
    createData('ПАОД Фертиков В.В. 292', ''),
    createData('', ''),
    createData('', ''),
    createData('', ''),
    createData('', ''),
    createData('', ''),
    createData('Инфокоммуникационные системы и сети Коваль А.С. (ДО)', 'Н'),
    createData('Обработка изображений Фертиков В. В. 297', ''),
    createData('', ''),
    createData('Информационные поисковые системы Сычев А. В. 385', ''),
];

export default function ScheduleTable() {
    return (
        <>
        <Box sx={{ position: 'relative', left: '5%', width: '700px' }}>
            <Typography variant='h3'>Еженедельное расписание</Typography>
        </Box>
        <Box sx={{ width: '90%', position: 'fixed', left: '5%' }}>
            <Link href='student-grades-table' passHref>
                <Button variant='outlined' style={{ width: '250px', position: 'fixed', right: '350px' }}>Код посещаемости</Button>
            </Link>
            <Link href='student-grades-table' passHref>
                <Button variant='outlined' style={{ width: '250px', position: 'fixed', right: '5%' }}>Открыть успеваемость</Button>
            </Link>
            <br/>
            <br/>
            <Box sx={{ width: '18%', position: 'fixed', left: '20%' }}>
                <Table
                sx={{ 
                    'td':{
                      border: '1px solid black',
                      fontSize: '20px'
                    }
                   }}>
                    <tr>
                        <td width={ '100px' }>Месяц</td>
                        <td>Март</td>
                    </tr>
                </Table>
            </Box>
            <Box sx={{ width: '18%', position: 'fixed', right: '20%' }}>
                <Table
                sx={{ 
                    'td':{
                      border: '1px solid black',
                      fontSize: '20px'
                    }
                   }}>
                    <tr>
                        <td width={ '100px' }>Месяц</td>
                        <td>Март</td>
                    </tr>
                </Table>
            </Box>
            <br/>
            <br/>
            <Box sx={{ width: '44%', position: 'fixed', left: '5%' }}>
                <Table
                sx={{ 
                    'td':{
                      border: '1px solid black',
                      textAlign: 'center'
                    }
                   }}>
                    <tr>
                        <td style={{ fontWeight: 'bold' }} rowSpan={4}>27</td>
                        <td>08:00 - 09:35</td>
                        <td></td>
                        <td width={ '10%' }></td>
                    </tr>
                    <tr>
                        <td>09:45 - 11:20</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>11:30 - 13:05</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>13:25 - 15:00</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }} rowSpan={4}>ПН</td>
                        <td>15:10 - 16:45</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>16:55 - 18:30</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>18:40 - 20:00</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>20:10 - 21:30</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }} rowSpan={4}>28</td>
                        <td>08:00 - 09:35</td>
                        <td>Квантовая теория Стадная Р. П. 303п</td>
                        <td>Н</td>
                    </tr>
                    <tr>
                        <td>09:45 - 11:20</td>
                        <td>Обработка изображений Фертиков В. В. 297</td>
                        <td>О</td>
                    </tr>
                    <tr>
                        <td>11:30 - 13:05</td>
                        <td>Информационные поисковые системы Сычев А. В. 314п</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>13:25 - 15:00</td>
                        <td>Информационные поисковые системы Сычев А. В. 385</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }} rowSpan={4}>ВТ</td>
                        <td>15:10 - 16:45</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>16:55 - 18:30</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>18:40 - 20:00</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>20:10 - 21:30</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }} rowSpan={4}>29</td>
                        <td>08:00 - 09:35</td>
                        <td>Квантовая теория Запрягаев С.А. (ДО)</td>
                        <td>Н</td>
                    </tr>
                    <tr>
                        <td>09:45 - 11:20</td>
                        <td>Технологии интернет вещей Зуев С.А. (ДО)</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>11:30 - 13:05</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>13:25 - 15:00</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }} rowSpan={4}>СР</td>
                        <td>15:10 - 16:45</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>16:55 - 18:30</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>18:40 - 20:00</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>20:10 - 21:30</td>
                        <td></td>
                        <td></td>
                    </tr>
                </Table>
            </Box>
            <Box sx={{ width: '44%', position: 'fixed', right: '5%' }}>
                <Table
                sx={{ 
                    'td':{
                      border: '1px solid black',
                      textAlign: 'center'
                    }
                   }}>
                    <tr>
                        <td style={{ fontWeight: 'bold' }} rowSpan={4}>30</td>
                        <td>08:00 - 09:35</td>
                        <td>{data[0].dataEntry}</td>
                        <td>{data[0].attendance}</td>
                    </tr>
                    <tr>
                        <td>09:45 - 11:20</td>
                        <td>{data[1].dataEntry}</td>
                        <td>{data[1].attendance}</td>
                    </tr>
                    <tr>
                        <td>11:30 - 13:05</td>
                        <td>{data[2].dataEntry}</td>
                        <td>{data[2].attendance}</td>
                    </tr>
                    <tr>
                        <td>13:25 - 15:00</td>
                        <td>{data[3].dataEntry}</td>
                        <td>{data[3].attendance}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }} rowSpan={4}>ЧТ</td>
                        <td>15:10 - 16:45</td>
                        <td>{data[4].dataEntry}</td>
                        <td>{data[4].attendance}</td>
                    </tr>
                    <tr>
                        <td>16:55 - 18:30</td>
                        <td>{data[5].dataEntry}</td>
                        <td>{data[5].attendance}</td>
                    </tr>
                    <tr>
                        <td>18:40 - 20:00</td>
                        <td>{data[6].dataEntry}</td>
                        <td>{data[6].attendance}</td>
                    </tr>
                    <tr>
                        <td>20:10 - 21:30</td>
                        <td>{data[7].dataEntry}</td>
                        <td>{data[7].attendance}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }} rowSpan={4}>31</td>
                        <td>08:00 - 09:35</td>
                        <td>{data[8].dataEntry}</td>
                        <td>{data[8].attendance}</td>
                    </tr>
                    <tr>
                        <td>09:45 - 11:20</td>
                        <td>{data[9].dataEntry}</td>
                        <td>{data[9].attendance}</td>
                    </tr>
                    <tr>
                        <td>11:30 - 13:05</td>
                        <td>{data[10].dataEntry}</td>
                        <td>{data[10].attendance}</td>
                    </tr>
                    <tr>
                        <td>13:25 - 15:00</td>
                        <td>{data[11].dataEntry}</td>
                        <td width={ '10%' }>{data[11].attendance}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }} rowSpan={4}>ПТ</td>
                        <td>15:10 - 16:45</td>
                        <td>{/* data[4].dataEntry */}</td>
                        <td>{/* data[4].attendance */}</td>
                    </tr>
                    <tr>
                        <td>16:55 - 18:30</td>
                        <td>{/* data[5].dataEntry */}</td>
                        <td>{/* data[5].attendance */}</td>
                    </tr>
                    <tr>
                        <td>18:40 - 20:00</td>
                        <td>{/* data[6].dataEntry */}</td>
                        <td>{/* data[6].attendance */}</td>
                    </tr>
                    <tr>
                        <td>20:10 - 21:30</td>
                        <td>{/* data[7].dataEntry */}</td>
                        <td>{/* data[7].attendance */}</td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }} rowSpan={4}>1</td>
                        <td>08:00 - 09:35</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>09:45 - 11:20</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>11:30 - 13:05</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>13:25 - 15:00</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }} rowSpan={4}>СБ</td>
                        <td>15:10 - 16:45</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>16:55 - 18:30</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>18:40 - 20:00</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>20:10 - 21:30</td>
                        <td></td>
                        <td></td>
                    </tr>
                </Table>
            </Box>
        </Box>
        </>
    )
}