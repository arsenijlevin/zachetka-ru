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
  const [teacherLogins, setTeacherLogins] = useState([]);
  const [groupsId, setGroupsId] = useState([0]);
  const [groupId, setGroupId] = useState(0);
  const [semester, setSemester] = useState(0);
  const [reportingType, setReportingType] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit() {
    setError("");
    setSuccessMessage("");
    try{
      await axios.post("subjects/create", { title, professors_login: teacherLogins, groups_id: groupsId, semester, reporting_type: reportingType });
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
        <Box className="flex flex-col gap-8 self-center">
          <Typography variant="h5" fontWeight="bold">
            Добавить дисциплину
          </Typography>
          <Box>
            <Typography variant="body1">Введите название</Typography>
            <Input className="mt-2 p-1" onChange={(e) => setTitle(e.target.value)}/>
          </Box>
          <Box>
            <Typography variant="body1">Введите семестр</Typography>
            <Input className="mt-2 p-1" onChange={(e) => setSemester(parseInt(e.target.value))}/>
          </Box>
          <Box>
            <Typography variant="body1">Выбор преподавателей</Typography>
            <Input className="mt-2 p-1" onChange={(e) => setTeacherLogins(handleChange(e.target.value))}/>
          </Box>
          <Box>
            <Typography variant="body1">Выберите группы</Typography>
            <Input className="mt-2 p-1" onChange={(e) => setGroupsId(handleIds(e.target.value))}/>
          </Box>
          <Box>
            <Typography variant="body1">Выберите отчётность</Typography>
            <Select placeholder="Выберите..." options={examType} className="mt-2" onChange={(e) => {
              if (e !== null) {
                setReportingType(e.value)
                }}}/>
          </Box>
          <Typography variant="body1" color={"green"}>
              {successMessage}
          </Typography>
          <Typography variant="body1" color={"red"}>
              {error}
          </Typography>
          <Button variant="contained" size="medium" className="px-2 py-1" onClick={handleSubmit}>
            Добавить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddSubjectPopUp;
