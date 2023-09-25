import { Modal, Button, Box, Typography, Input } from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";

interface DeleteLecturePopUpProps {
  open: boolean;
  setOpen: (value: number) => void;
}

function DeleteLecturePopUp({ open, setOpen }: DeleteLecturePopUpProps) {
  const handleClose = () => setOpen(0);
  const [lessonId, setLessonId] = useState(0);
  const [, setError] = useState("");
  const [, setSuccessMessage] = useState("");

  async function handleSubmit() {
    try {
      await axios.delete(`lessons/delete/${lessonId}`);
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

  return (
    <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white translate-y-1/3">
        <AiOutlineClose cursor={"pointer"} size={20} onClick={handleClose} style={{ alignSelf: "flex-end" }} />
        {/* кнопка закрытия */}
        <Box className="flex flex-col gap-8 self-center">
          <Typography variant="h5" fontWeight="bold">
            Удалить пару
          </Typography>
          <Box>
            <Typography variant="body1">Введите ID пары</Typography>
            <Input type="text" className="mt-2 p-1" fullWidth onChange={(e) => setLessonId(parseInt(e.target.value))} />
          </Box>
          <Button variant="contained" size="medium" className="px-2 py-1" onClick={handleSubmit}>
            Удалить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteLecturePopUp;
