import { Modal, Box } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';

interface AddLecturerPopUpProps {
  open: boolean;
  setOpen: (value: number) => void;
}

function AddLecturerPopUp({ open, setOpen }: AddLecturerPopUpProps) {

  const handleClose = () => setOpen(0);

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
        <h2 className='self-center font-bold text-2xl pb-8'>Добавить преподавателя</h2>
        <div className="flex flex-col gap-5 self-center">
          <div>
            <h4 className="font-bold text-blue-950">Введите Ф.И.О.</h4>
            <input type="text" className="mt-2 border border-grey" />
            {/* Ввод Ф.И.О.*/}
          </div>
          <div>
            <h4 className="font-bold text-blue-950">Введите E-mail</h4>
            <input type="email" className="mt-2 border border-grey" />
            {/* Ввод E-mail*/}
          </div>
          <div>
            <h4 className="font-bold text-blue-950">Введите Telegram</h4>
            <input type="text" className="mt-2 border border-grey" />
            {/* Ввод Telegram*/}
          </div>
          <button className="self-center border border-gray px-2 py-1 bg-gray-100">
            Добавить
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default AddLecturerPopUp;
