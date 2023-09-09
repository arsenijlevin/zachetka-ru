import { Modal, Input, Button, Box, Typography } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import Select from "react-select";

interface AddLecturePopUpProps {
  open: boolean;
  setOpen: (value: number) => void;
}

function AddLecturePopUp({ open, setOpen }: AddLecturePopUpProps) {
  const handleClose = () => setOpen(0);

  const subjects = [
    { value: "ТП", label: "ТП" },
    { value: "ИПС", label: "ИПС" },
    { value: "ИСиС", label: "ИСиС" },
  ];

  const lecturers = [
    { value: "Преподаватель 1", label: "Преподаватель 1" },
    { value: "Преподаватель 2", label: "Преподаватель 2" },
    { value: "Преподаватель 3", label: "Преподаватель 3" },
  ];

  const groups = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ];

  return (
    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white translate-y-20">
        <AiOutlineClose cursor={"pointer"} size={20} onClick={handleClose} style={{ alignSelf: "flex-end" }} />
        {/* кнопка закрытия */}
        <Box className="flex flex-col gap-8 self-center">
          <Typography variant="h5" fontWeight="bold">
            Добавить пару
          </Typography>
          <Box>
            <Typography variant="body1">Выбор дисциплины</Typography>
            <Select placeholder="Выберите..." options={subjects} className="mt-2" />
            {/* Выбор дисциплины*/}
          </Box>
          <Box>
            <Typography variant="body1">Введите время</Typography>
            <Input type="text" className="mt-2 p-1" fullWidth />
            {/* Ввод времени*/}
          </Box>
          <Box>
            <Typography variant="body1">Введите аудиторию</Typography>
            <Input type="text" className="mt-2 p-1" fullWidth />
            {/* Ввод аудитории*/}
          </Box>
          <Box>
            <Typography variant="body1">Выберите преподавателя</Typography>
            <Select placeholder="Выберите..." options={lecturers} className="mt-2" />
            {/* Выбор преподавателей*/}
          </Box>
          <Box>
            <Typography variant="body1">Выберите группы</Typography>
            <Select placeholder="Выберите..." isMulti options={groups} className="mt-2" />
            {/* Выбор групп*/}
          </Box>
          <Button variant="contained" size="medium" className="px-2 py-1">
            Добавить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddLecturePopUp;
