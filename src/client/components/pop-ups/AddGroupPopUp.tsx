import { Modal, Box, Typography } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';

interface AddGroupPopUpProps {
  open: boolean;
  setOpen: (value: number) => void;
}

function AddGroupPopUp({ open, setOpen }: AddGroupPopUpProps) {

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
        <h2 className='self-center font-bold text-2xl pb-8'>Добавить группу</h2>
        {/* кнопка закрытия */}
        <div className="flex flex-col gap-5 self-center">
          <div>
            <h4 className="font-bold text-blue-950">Введите код группы</h4>
            <input type="number" className="mt-2 border border-grey" />
            {/* Ввод код группы*/}
          </div>
          <div>
            <h4 className="font-bold text-blue-950">Введите семестр обучения</h4>
            <input type="number" className="mt-2 border border-grey" />
            {/* Ввод семестра обучения*/}
          </div>
          <button className="self-center border border-gray px-2 py-1 bg-gray-100">
            Добавить
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default AddGroupPopUp;
