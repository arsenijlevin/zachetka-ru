import { Modal, Input, Button, Box, Typography } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import Select from "react-select";
import axios from "axios";
import { useState } from "react";

interface AddSubjectPopUpProps {
  open: boolean;
  setOpen: (value: number) => void;
}

function AddSubjectPopUp({ open, setOpen }: AddSubjectPopUpProps) {
  const handleClose = () => setOpen(0);
  const [title, setTitle] = useState("");
  

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
        <Box className="flex flex-col gap-8 self-center">
          <Typography variant="h5" fontWeight="bold">
            Добавить дисциплину
          </Typography>
          <Box>
            <Typography variant="body1">Введите название</Typography>
            <Input type="text" className="mt-2 p-1" fullWidth></Input>
          </Box>
          <Box>
            <Typography variant="body1">Выбор преподавателей</Typography>
            <Select placeholder="Выберите..." isMulti options={lecturers} className="mt-2" />
          </Box>
          <Box>
            <Typography variant="body1">Выберите группы</Typography>
            <Select placeholder="Выберите..." isMulti options={groups} className="mt-2" />
          </Box>
          <Box>
            <Typography variant="body1">Выберите отчётность</Typography>
            <Select placeholder="Выберите..." options={examType} className="mt-2" />
          </Box>
          <Button variant="contained" size="medium" className="px-2 py-1">
            Добавить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddSubjectPopUp;
