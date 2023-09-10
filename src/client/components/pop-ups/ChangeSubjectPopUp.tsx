import { Modal, Input, Button, Box, Typography } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import Select from "react-select";

interface ChangeSubjectPopUpProps {
  open: boolean;
  setOpen: (value: number) => void;
}

function ChangeSubjectPopUp({ open, setOpen }: ChangeSubjectPopUpProps) {
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

  const examType = [
    { value: "Экзамен", label: "Экзамен" },
    { value: "Зачёт", label: "Зачёт" },
  ];

  return (
    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white translate-y-20">
        <AiOutlineClose cursor={"pointer"} size={20} onClick={handleClose} style={{ alignSelf: "flex-end" }} />
        {/* кнопка закрытия */}

        <Box className="flex flex-col gap-8 self-center">
          <Typography variant="h5" fontWeight="bold">
            Изменить дисциплину
          </Typography>
          {/* Выбор семестра*/}
          <Box>
            <Typography variant="body1">Выбор семестра</Typography>
            <Input
              type="number"
              className="mt-2 p-1"
              inputProps={{
                min: 1,
                max: 12,
              }}
              fullWidth
            />
          </Box>
          {/* Выбор дисциплины*/}
          <Box>
            <Typography variant="body1">Выбор дисциплины</Typography>
            <Select placeholder="Выберите..." options={subjects} className="mt-2" />
          </Box>
          <Box>
            <Typography variant="body1">Выбор преподавателей</Typography>
            <Select placeholder="Выберите..." isMulti options={lecturers} className="mt-2" />
            {/* Выбор преподавателей*/}
          </Box>
          <Box>
            <Typography variant="body1">Выбор группы</Typography>
            <Select placeholder="Выберите..." isMulti options={groups} className="mt-2" />
            {/* Выбор группы*/}
          </Box>
          <Box>
            <Typography variant="body1">Выбор отчётности</Typography>
            <Select placeholder="Выберите..." options={examType} className="mt-2" />
            {/* Выбор отчётности*/}
          </Box>
          <Button variant="contained" size="medium" className="px-2 py-1">
            Применить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ChangeSubjectPopUp;
