import { Modal, Box, Button, Typography } from '@mui/material';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers/locales';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import { AiOutlineClose } from 'react-icons/ai';
import React from 'react';
import Select from 'react-select';
import Countdown from 'react-countdown';

interface AttendanceCheckPopUpProps {
    open: boolean;
    setOpen: (value: number) => void;
}

interface TimerProps {
    minutes: number;
    seconds: number;
    completed: boolean;
}

function AttendanceCheckPopUp({ open, setOpen }: AttendanceCheckPopUpProps) {
    const studentsQuantity = 15;
    const subjectName = 'Технологии программирования';
    const semester = 6;
    const handleClose = () => setOpen(0);
    const[state, setState] = React.useState(0)
    const code = 'test';
    const time = 60000;
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

    const renderer = ({ minutes, seconds, completed }: TimerProps) => {
        if (completed) {
          return <Typography variant="h1" textAlign={'center'}>00:00</Typography>;
        } else {
          return <Typography variant="h1" textAlign={'center'}>{minutes}:{seconds}</Typography>;
        }
      };


    if (state === 0) {
        return(
            <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white mt-16">
                    <button className="self-end">
                        <AiOutlineClose onClick={handleClose} />
                    </button>
                    <Box className="flex flex-col gap-8 self-center">
                        <Typography variant="h6" textAlign={'center'}>
                            Настройка проверки посещаемости
                        </Typography>
                        <Typography variant="h6" textAlign={'center'}>
                            {subjectName} ({semester} семестр)
                        </Typography>
                        <br />
                        <Typography variant="h6" textAlign={'center'} fontStyle={'italic'}>
                            Введите время проверки от 00:30 до 15:00
                        </Typography>
                        <LocalizationProvider localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
                            dateAdapter={AdapterLuxon} adapterLocale='ru'>
                                <MultiSectionDigitalClock sx={{ width: '130px', margin: 'auto',
                                '.css-1916zh5-MuiList-root-MuiMultiSectionDigitalClockSection-root': {
                                    width: '60px',
                                }
                            }} timeSteps={{ minutes: 1 }} views={['minutes', 'seconds']} />
                        </LocalizationProvider>
                        <Select
                        placeholder="Выберите день недели"
                        options={days}/>
                        <Select
                        placeholder="Числитель/знаменатель"
                        options={frequency}/>
                        <Typography variant="h6" textAlign={'center'}>
                            На занятии должно присутствовать {studentsQuantity} студентов
                        </Typography>
                        <Button variant='outlined' style={{ width: '500px' }} onClick={handleChangeStateToMiddle}>Запустить проверку посещаемости</Button>
                    </Box>
                </Box>
            </Modal>
        );
    }

    if (state === 1) {
        return(
            <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white mt-16">
                    <Box className="flex flex-col gap-8 self-center">
                        <button className="self-end">
                            <AiOutlineClose onClick={handleClose} />
                        </button>
                        <Typography variant="h6" textAlign={'center'}>
                            Идёт проверка посещаемости
                        </Typography>
                        <Countdown date={Date.now() + time} renderer={renderer} className='text-center'/>
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
        return(
            <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white mt-16">
                    <Box className="flex flex-col self-center">
                        <button className="self-end">
                            <AiOutlineClose onClick={handleClose} />
                        </button>
                        <Typography variant="h6" textAlign={'center'}>
                            Итог проверки посещаемости
                        </Typography>
                        <Typography variant="h1" textAlign={'center'}>
                            00:00
                        </Typography>
                        {groups.map((item) => (
                            <Typography variant="h6" textAlign={'center'}>Группа {item.title} - студентов отметилось: {item.studentsChecked}</Typography>
                        ))}
                        <Typography variant="h6" textAlign={'center'}>Всего студентов на занятии: {studentsChecked}</Typography>
                        <Typography variant="h6" textAlign={'center'}>
                            На занятии должно присутствовать {studentsQuantity} студентов
                        </Typography>
                        <br />
                        <Button variant='outlined' style={{ width: '500px' }} onClick={handleClose}>Сбросить учтённую сейчас посещаемость</Button>
                    </Box>
                </Box>
            </Modal>
        );
    }
}

export default AttendanceCheckPopUp;