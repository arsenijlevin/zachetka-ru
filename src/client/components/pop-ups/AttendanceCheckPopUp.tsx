import { Modal, Box, Button, Typography } from '@mui/material';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ruRU } from '@mui/x-date-pickers/locales';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import { AiOutlineClose } from 'react-icons/ai';
import React from 'react';
import Select from 'react-select';

interface AddGroupPopUpProps {
    open: boolean;
    setOpen: (value: number) => void;
}

function AttendanceCheckPopUp({ open, setOpen }: AddGroupPopUpProps) {
    const[studentsQuantity, setStudentsQuantity] = React.useState(15);
    const[subjectName, setSubjectName] = React.useState('Технологии программирования');
    const[semester, setSemester] = React.useState(6);
    const handleClose = () => setOpen(0);

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
                    <Button variant='outlined' style={{ width: '500px' }}>Запустить проверку посещаемости</Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default AttendanceCheckPopUp;

//день, числитель\знаменатель, время занятия