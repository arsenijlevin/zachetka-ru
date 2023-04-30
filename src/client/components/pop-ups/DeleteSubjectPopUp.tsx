import { Modal, Box, Typography } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';
import Select from 'react-select';

interface DeleteSubjectPopUpProps {
  open: boolean;
  setOpen: (value: number) => void;
}

function DeleteSubjectPopUp({ open, setOpen }: DeleteSubjectPopUpProps) {

  const handleClose = () => setOpen(0);

  const subjects = [
    { value: 'ТП', label: 'ТП' },
    { value: 'ИПС', label: 'ИПС' },
    { value: 'ИСиС', label: 'ИСиС' },
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
          <button className="self-center border border-gray px-2 py-1 bg-gray-100">
            Удалить
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default DeleteSubjectPopUp;
