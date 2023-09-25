import { Modal, Input, Button, Box, Typography } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import Select from "react-select";
import React, { useState } from "react";
import axios from "axios";

interface ChangeSubjectPopUpProps {
  open: boolean;
  setOpen: (value: number) => void;
}

function ChangeSubjectPopUp({ open, setOpen }: ChangeSubjectPopUpProps) {
  const handleClose = () => setOpen(0);
  const [subjectId, setSubjectId] = useState(0);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [title, setTitle] = useState("");
  const [lecturers, setLecturers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [semester, setSemester] = useState(0);
  const [reportingType, setReportingType] = useState("");

  async function handleSubmit() {
    setError("");
    setSuccessMessage("");
    try{
      await axios.patch(`subjects/update/${subjectId}`, { title, professors_login : lecturers, groups_id : groups, semester, reporting_type : reportingType });
      setSuccessMessage("Успех");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setError("Неверные данные");
        }
      }
    }
  }

  function handleChange(e : any) {
    e = e.split(/[ ,]+/);
    return e;
  }

  function handleIds(e : any) {
    e = e.split(/[ ,]+/);
    var arr = e.map(Number);
    return arr;
  }

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
              onChange={(e) => setSemester(parseInt(e.target.value))}
            />
          </Box>
          <Box>
            <Typography variant="body1">Введите ID дисциплины</Typography>
            <Input className="mt-2 p-1" fullWidth onChange={(e) => setSubjectId(parseInt(e.target.value))}/>
          </Box>
          <Box>
            <Typography variant="body1">Выбор преподавателей</Typography>
            <Input className="mt-2 p-1" fullWidth onChange={(e) => setLecturers(handleChange(e.target.value))}/>
          </Box>
          <Box>
            <Typography variant="body1">Выбор групп</Typography>
            <Input className="mt-2 p-1" fullWidth onChange={(e) => setGroups(handleIds(e.target.value))}/>
          </Box>
          <Box>
            <Typography variant="body1">Выберите отчётность</Typography>
            <Select placeholder="Выберите..." options={examType} className="mt-2" onChange={(e) => {
              if (e !== null) {
                setReportingType(e.value)
                }}}/>
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
