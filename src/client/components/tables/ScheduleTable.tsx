import { Box, Button, Table, TableBody, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import CodeCheckPopUp from 'components/pop-ups/CodeCheckPopUp';
import React from 'react';

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
    const [isPopupOpen, setIsPopupOpen] = React.useState(0);
    const modals = [null, CodeCheckPopUp];
    const handleOpenCodeCheck = () => setIsPopupOpen(1);
    const SelectedModal = modals[isPopupOpen];
    const tableForward = () => {
        console.log("Forward");
    }
    const tableBack = () => {
        console.log("Back");
    }

    return (
        <>
            <Box sx={{ width: '90%', margin: "0 auto" }}>
                <Box>
                    <Typography variant='h3'>Моя посещаемость</Typography>
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
                <Box display={"flex"} gap={5} textAlign={'center'}>
                    <Box flex={0.5}>
                        <Table
                            sx={{
                                'td': {
                                    border: '1px solid black',
                                    fontSize: '20px'
                                }
                            }}>
                            <TableBody>
                                <tr>
                                    <td>Месяц</td>
                                    <td>Март</td>
                                </tr>
                            </TableBody>
                        </Table>
                    </Box>
                    <Box flex={0.5}>
                        <Table
                            sx={{
                                'td': {
                                    border: '1px solid black',
                                    fontSize: '20px'
                                }
                            }}>
                            <TableBody>
                                <tr>
                                    <td>Месяц</td>
                                    <td>Март</td>
                                </tr>
                            </TableBody>
                        </Table>
                    </Box>
                </Box>

                <Box display={"flex"} marginY={1}>
                    <Box flex={1}>
                        <ArrowBackIcon cursor={"pointer"} onClick={tableBack}></ArrowBackIcon>
                    </Box>

                    <Box>
                        <ArrowForwardIcon cursor={"pointer"} onClick={tableForward}></ArrowForwardIcon>
                    </Box>
                </Box>
                <Box display={"flex"} gap={5}>
                    <Box flex={0.5}>
                        <Table
                            sx={{
                                'td': {
                                    border: '1px solid black',
                                    textAlign: 'center'
                                }
                            }}>
                            <TableBody>
                                <tr>
                                    <td style={{ fontWeight: 'bold' }} rowSpan={4}>27</td>
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
                            </TableBody>
                        </Table>
                    </Box>
                    <Box flex={0.5}>
                        <Table
                            sx={{
                                'td': {
                                    border: '1px solid black',
                                    textAlign: 'center'
                                }
                            }}>
                            <TableBody>
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
                                    <td>{data[11].attendance}</td>
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
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
            </Box>
            {SelectedModal ? <SelectedModal open={true} setOpen={setIsPopupOpen} /> : <></>}
        </>
    )
}
