import { Modal, Box, Input, Button, Typography } from '@mui/material';
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
        {/* Кнопка закрытия */}
        <AiOutlineClose cursor={"pointer"} size={20} onClick={handleClose} style={{ alignSelf: "flex-end" }} />

        <Box className="flex flex-col gap-8 self-center">
          <Typography variant="h5" fontWeight="bold">
            Добавить группу
          </Typography>

          {/* Ввод код группы*/}
          <Box>
            <Typography variant="body1">Введите код группы</Typography>
            <Input className="mt-2 p-1" />
          </Box>

          {/* Ввод семестра обучения*/}
          <Box>
            <Typography variant="body1">Введите семестр</Typography>
            <Input
              type="number"
              fullWidth
              className="mt-2 p-1"
              inputProps={{
                min: 1,
                max: 12,
              }}
            />
          </Box>

          <Button variant="contained" size="medium" className="px-2 py-1">
            Добавить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddGroupPopUp;
