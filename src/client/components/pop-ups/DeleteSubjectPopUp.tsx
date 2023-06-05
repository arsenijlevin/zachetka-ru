import { Modal, Button, Box, Typography } from '@mui/material';
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
        <AiOutlineClose cursor={"pointer"} size={20} onClick={handleClose} style={{ alignSelf: "flex-end" }} />
        {/* кнопка закрытия */}
        <Box className="flex flex-col gap-8 self-center">
          <Typography variant="h5" fontWeight="bold">Удалить дисциплину</Typography>
          <Box>
            <Typography variant="body1">Выберите дисциплину</Typography>
            <Select placeholder="Выберите..." options={subjects} className="mt-2" />
            {/* Выбор дисциплины*/}
          </Box>
          <Button variant="contained" size="medium" className="px-2 py-1">
            Удалить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteSubjectPopUp;
