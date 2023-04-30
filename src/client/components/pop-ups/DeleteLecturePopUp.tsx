import { Modal, Box, Typography } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import Select from 'react-select';

interface DeleteLecturePopUpProps {
  open: boolean;
  setOpen: (value: number) => void;
}

function DeleteLecturePopUp({ open, setOpen }: DeleteLecturePopUpProps) {

  const handleClose = () => setOpen(0);

  const subjects = [
    { value: 'ТП', label: 'ТП' },
    { value: 'ИПС', label: 'ИПС' },
    { value: 'ИСиС', label: 'ИСиС' },
  ];

  const groups = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
  ];

  const lectures = [
    { value: 'вт 9:45', label: 'вт 9:45' },
    { value: 'пт 11:30', label: 'пт 11:30' },
    { value: 'пт 13:25', label: 'пт 13:25' },
  ];

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white translate-y-1/3">
      <button className="self-end">
          <AiOutlineClose onClick={handleClose} />
        </button>
        {/* кнопка закрытия */}
        <h2 className='self-center font-bold text-2xl pb-8'>Удалить дисциплину</h2>
        <div className="flex flex-col gap-5 self-center">
            <div>
                <h4 className="font-bold text-blue-950">Выберите дисциплину</h4>
                <Select placeholder="Выберите..." options={subjects} className="mt-2"/>
                {/* Выбор дисциплины*/}
            </div>
            <div>
                <h4 className="font-bold text-blue-950">Выберите группу</h4>
                <Select placeholder="Выберите..." options={groups} className="mt-2"/>
                {/* Выбор группы*/}
            </div>
            <div>
                <h4 className="font-bold text-blue-950">Выберите пару</h4>
                <Select placeholder="Выберите..." options={lectures} className="mt-2"/>
                {/* Выбор пары*/}
            </div>
            <button className="self-center border border-gray px-2 py-1 bg-gray-100">
            Удалить
            </button>
        </div>
      </Box>
    </Modal>
  );
}

export default DeleteLecturePopUp;