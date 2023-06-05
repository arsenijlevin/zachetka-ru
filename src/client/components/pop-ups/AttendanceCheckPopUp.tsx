import { Modal, Box, Button, Typography } from '@mui/material';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers/locales';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import { AiOutlineClose } from 'react-icons/ai';
import React from 'react';
import Select from 'react-select';
import Countdown from 'react-countdown';
import { DateTime } from "luxon"
import Image from 'next/image';

interface AttendanceCheckPopUpProps {
    open: boolean;
    setOpen: (value: number) => void;
}

interface TimerProps {
    minutes: number;
    seconds: number;
    completed: boolean;
}

const seconds30 = DateTime.now().set({ hour: 0, minute: 0, second: 10, millisecond: 0 });
const minutes15 = DateTime.now().set({ hour: 0, minute: 15, second: 0, millisecond: 0 })

function AttendanceCheckPopUp({ open, setOpen }: AttendanceCheckPopUpProps) {
    const studentsQuantity = 15;
    const subjectName = 'Технологии программирования';
    const semester = 6;
    const handleClose = () => setOpen(0);
    const [state, setState] = React.useState(0)
    const code = 'test';
    const time = 6000;
    const groups = [
        {
            title: '1',
            studentsChecked: 3
        },
        {
            title: '2',
            studentsChecked: 7
        }
    ];
    const studentsChecked = 10;

    function handleChangeStateToMiddle() {
        setState(1);
    }

    function handleChangeStateToEnd() {
        setState(2);
    }

    const days = [
        { value: 'Понедельник', label: 'Понедельник' },
        { value: 'Вторник', label: 'Вторник' },
        { value: 'Среда', label: 'Среда' },
        { value: 'Четверг', label: 'Четверг' },
        { value: 'Пятница', label: 'Пятница' },
        { value: 'Суббота', label: 'Суббота' },
        { value: 'Воскресенье', label: 'Воскресенье' }];
    const frequency = [
        { value: 'Числитель', label: 'Числитель' },
        { value: 'Знаменатель', label: 'Знаменатель' }
    ];
    const times = [
        { value: '13:25', label: '13:25' },
        { value: '15:00', label: '15:00' },
    ]

    const renderer = ({ minutes, seconds, completed }: TimerProps) => {
        if (completed) {
            return <Typography variant="h1" textAlign={'center'}>00:00</Typography>;
        } else {
            return <Typography variant="h1" textAlign={'center'}>{minutes}:{seconds}</Typography>;
        }
    };


    if (state === 0) {
        return (
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white mt-16">
                    <AiOutlineClose cursor={"pointer"} size={20} onClick={handleClose} style={{ alignSelf: "flex-end" }} />
                    <Box className="flex flex-col gap-4 self-center">
                        <Typography variant="h5" textAlign={'center'}>
                            Настройка проверки посещаемости
                        </Typography>
                        <Typography variant="h6" textAlign={'center'}>
                            {subjectName} ({semester} семестр)
                        </Typography>
                        <Typography variant="h6" textAlign={'center'} fontStyle={'italic'}>
                            Введите время проверки от 00:10 до 15:00
                        </Typography>
                        <Box margin={'auto'} height={'100px'}>
                            <LocalizationProvider localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
                                dateAdapter={AdapterLuxon} adapterLocale='ru'>
                                <MultiSectionDigitalClock minTime={seconds30} maxTime={minutes15}  sx={{ height: '100px' }}  timeSteps={{ minutes: 1 }} views={['minutes', 'seconds']} />
                            </LocalizationProvider>
                        </Box>
                        <Select
                            placeholder="Выберите день недели"
                            options={days} />
                        <Select
                            placeholder="Числитель/знаменатель"
                            options={frequency} />
                            <Select
                            placeholder="Время занятия"
                            options={times} />
                        <Typography variant="h6" textAlign={'center'}>
                            На занятии должно присутствовать {studentsQuantity} студентов
                        </Typography>
                        <Button variant='outlined' onClick={handleChangeStateToMiddle}>Запустить проверку посещаемости</Button>
                    </Box>
                </Box>
            </Modal >
        );
    }

    if (state === 1) {
        return (
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white mt-16">
                    <Box className="flex flex-col gap-8 self-center justify-center items-center">
                        <AiOutlineClose cursor={"pointer"} size={20} onClick={handleClose} style={{ alignSelf: "flex-end" }} />
                        <Typography variant="h6" textAlign={'center'}>
                            Идёт проверка посещаемости
                        </Typography>
                        <Countdown date={Date.now() + time} renderer={renderer} className='text-center' onComplete={() => setState(2)}/>
                        <Image src={"/test_code.png"} alt={"code"} width={200} height={200}/>
                        <Typography variant="h6" textAlign={'center'}>
                            Код: {code}
                        </Typography>
                        <Button variant='outlined' style={{ width: '500px' }} onClick={handleChangeStateToEnd}>Закончить проверку посещаемости</Button>
                    </Box>
                </Box>
            </Modal>
        );
    }

    if (state === 2) {
        return (
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white mt-16 break-all">
                    <Box className="flex flex-col self-center break-all">
                        <AiOutlineClose cursor={"pointer"} size={20} onClick={handleClose} style={{ alignSelf: "flex-end" }} />
                        <Typography variant="h3" textAlign={'center'} className={"break-all"}>
                            Итог
                        </Typography>
                        <Typography variant="h3" textAlign={'center'} marginY={3}>
                            00:00
                        </Typography>
                        <Box marginBottom={2}>
                            {groups.map((item, index) => (
                                <Typography key={index} variant="body1" textAlign={'center'} marginBottom={1}>Группа {item.title} - студентов отметилось: {item.studentsChecked}</Typography>
                            ))}
                        </Box>
                        <Typography variant="body1" textAlign={'center'}>Всего студентов на занятии: {studentsChecked}</Typography>
                        <Typography variant="body1" textAlign={'center'}>
                            На занятии должно присутствовать {studentsQuantity} студентов
                        </Typography>
                        <br />
                        <Button variant='outlined' style={{ width: '500px' }} onClick={handleClose}>Сбросить учтённую сейчас посещаемость</Button>
                    </Box>
                </Box>
            </Modal>
        );
    }

    return (
        <></>
    );
}

export default AttendanceCheckPopUp;