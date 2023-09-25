import { Modal, Input, Button, Box, Typography } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import Select from "react-select";
import { useState } from "react";
import axios from "axios";

interface AddLecturePopUpProps {
  open: boolean;
  setOpen: (value: number) => void;
}

function AddLecturePopUp({ open, setOpen }: AddLecturePopUpProps) {
  const handleClose = () => setOpen(0);
  const [groupsId, setGroupsId] = useState<number[]>([]);
  const [weekday, setWeekday] = useState("");
  const [time, setTime] = useState("");
  const [subjectId, setSubjectId] = useState(0);
  const [place, setPlace] = useState("");
  const [frequency, setFrequency] = useState("");
  const [lecturerLogin, setLecturerLogin] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit() {
    try {
      await axios.post("lessons/create", {
        groups_id: groupsId,
        week_day: weekday,
        time,
        subject_id: subjectId,
        place,
        frequency,
        professor_login: lecturerLogin,
      });
      setSuccessMessage("Успех");
      console.log("Успех");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setError("Неверные данные");
        }
      }
    }
  }

  function handleIds(e: string) {
    const stringSplit = e.split(/[ ,]+/);
    const arr = stringSplit.map(Number);
    return arr;
  }

  const frequencyOptions = [
    { value: "Числитель", label: "Числитель" },
    { value: "Знаменатель", label: "Знаменатель" },
  ];

  return (
    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box className="m-auto w-1/2 flex flex-col border border-grey px-8 py-2 bg-white translate-y-5">
        <AiOutlineClose cursor={"pointer"} size={20} onClick={handleClose} style={{ alignSelf: "flex-end" }} />
        {/* кнопка закрытия */}
        <Box className="flex flex-col gap-4 self-center">
          <Typography variant="h5" fontWeight="bold">
            Добавить пару
          </Typography>
          <Box>
            <Typography variant="body1">Выберите группы</Typography>
            <Input className="mt-2 p-1" onChange={(e) => setGroupsId(handleIds(e.target.value))} />
          </Box>
          <Box>
            <Typography variant="body1">Введите ID дисциплины</Typography>
            <Input
              type="text"
              className="mt-2 p-1"
              fullWidth
              onChange={(e) => setSubjectId(parseInt(e.target.value))}
            />
          </Box>
          <Box>
            <Typography variant="body1">Введите день недели</Typography>
            <Input type="text" className="mt-2 p-1" fullWidth onChange={(e) => setWeekday(e.target.value)} />
            {/* Ввод дня недели*/}
          </Box>
          <Box>
            <Typography variant="body1">Введите время</Typography>
            <Input type="text" className="mt-2 p-1" fullWidth onChange={(e) => setTime(e.target.value)} />
            {/* Ввод времени*/}
          </Box>
          <Box>
            <Typography variant="body1">Введите аудиторию</Typography>
            <Input type="text" className="mt-2 p-1" fullWidth onChange={(e) => setPlace(e.target.value)} />
            {/* Ввод аудитории*/}
          </Box>
          <Box>
            <Typography variant="body1">Выберите отчётность</Typography>
            <Select
              placeholder="Выберите..."
              options={frequencyOptions}
              className="mt-2"
              onChange={(e) => {
                if (e !== null) {
                  setFrequency(e.value);
                }
              }}
            />
          </Box>
          <Box>
            <Typography variant="body1">Выберите преподавателя</Typography>
            <Input type="text" className="mt-2 p-1" fullWidth onChange={(e) => setLecturerLogin(e.target.value)} />
            {/* Выбор преподавателя*/}
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

export default AddLecturePopUp;
