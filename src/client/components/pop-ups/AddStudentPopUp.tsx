import { Modal, Input, Button, Box, Typography } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';

interface AddStudentPopUpProps {
  open: boolean;
  setOpen: (value: number) => void;
}

function AddStudentPopUp({ open, setOpen }: AddStudentPopUpProps) {

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
          <Typography variant="h5" fontWeight="bold">Добавить студента</Typography>
          <Box>
              <Typography variant="body1">Введите номер студенческого</Typography>
              <Input type="number" className="mt-2 p-1" fullWidth/>
              {/* Ввод номера студенческого*/}
          </Box>
          <Box>
              <Typography variant="body1">Введите Ф.И.О.</Typography>
              <Input type="text" className="mt-2 p-1" fullWidth/>
              {/* Ввод Ф.И.О.*/}
          </Box>
          <Box>
              <Typography variant="body1">Введите группу</Typography>
              <Input type="text" className="mt-2 p-1" fullWidth/>
              {/* Ввод группы*/}
          </Box>
          <Box>
              <Typography variant="body1">Введите направление обучения</Typography>
              <Input type="text" className="mt-2 p-1" fullWidth/>
              {/* Ввод направления обучения*/}
          </Box>
          <Button variant="contained" size="medium" className="px-2 py-1">
              Добавить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddStudentPopUp;