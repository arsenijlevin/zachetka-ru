import { Modal, Input, Button, Box, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { toProps } from "lib/serverSideUtils";

interface AddStudentPopUpProps {
  open: boolean;
  setOpen: (value: number) => void;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookiesText = context.req.headers.cookie;

  if (cookiesText) {
    const cookies = new Cookies(cookiesText);

    const token = cookies.get<string>("token");
    const decodedCookie = jwt_decode<Record<string, string>>(token);

    return toProps({ decodedCookie });
  }

  return toProps({ decodedCookie: {} });
};

function AddStudentPopUp({ open, setOpen }: AddStudentPopUpProps) {
  const handleClose = () => setOpen(0);
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit() {
    try{

      const cookies = new Cookies();
      const token = cookies.get<string>("token");

      if (!token) {
        throw new Error();
      }

      const header = {
        Authorization: `Bearer ${token}`,
      };
      setError("");
      setSuccessMessage("");
      await axios.post("users/add", { password, login, name, rights_id : 2 }, { headers: header });
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
      <Box className="m-auto w-1/2 flex flex-col border border-grey px-16 py-8 bg-white translate-y-20">
        <AiOutlineClose cursor={"pointer"} size={20} onClick={handleClose} style={{ alignSelf: "flex-end" }} />
        {/* кнопка закрытия */}
        <Box className="flex flex-col gap-8 self-center">
          <Typography variant="h5" fontWeight="bold">
            Добавить студента
          </Typography>
          <Box>
            <Typography variant="body1">Введите Ф.И.О.</Typography>
            <Input type="text" className="mt-2 p-1" fullWidth onChange={(e) => setName(e.target.value)}/>
          </Box>
          <Box>
            <Typography variant="body1">Введите логин</Typography>
            <Input type="text" className="mt-2 p-1" fullWidth onChange={(e) => setLogin(e.target.value)} />
          </Box>
          <Box>
            <Typography variant="body1">Введите пароль</Typography>
            <Input type="password" className="mt-2 p-1" fullWidth onChange={(e) => setPassword(e.target.value)} />
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

export default AddStudentPopUp;
