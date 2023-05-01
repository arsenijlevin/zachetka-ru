import { Modal, Input, Button, Box, Typography } from '@mui/material';
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
      <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white translate-y-20">
        <button className="self-end">
          <AiOutlineClose onClick={handleClose} />
        </button>
        {/* кнопка закрытия */}
        <Box className="flex flex-col gap-8 self-center">
          <Typography variant="h5" fontWeight="bold">Добавить преподавателя</Typography>
          <Box>
            <Typography variant="body1">Введите Ф.И.О.</Typography>
            <Input type="text" className="mt-2 p-1" fullWidth/>
            {/* Ввод Ф.И.О.*/}
          </Box>
          <Box>
            <Typography variant="body1">Введите E-mail</Typography>
            <Input type="text" className="mt-2 p-1" fullWidth/>
            {/* Ввод E-mail*/}
          </Box>
          <Box>
            <Typography variant="body1">Введите Telegram</Typography>
            <Input type="text" className="mt-2 p-1" fullWidth/>
            {/* Ввод Telegram*/}
          </Box>
          <Button variant="contained" size="medium" className="px-2 py-1">
            Добавить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddLecturerPopUp;
