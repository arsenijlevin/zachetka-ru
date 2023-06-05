import React from 'react';
import ChangeSubjectPopUp from '../components/pop-ups/ChangeSubjectPopUp';
import AddGroupPopUp from '../components/pop-ups/AddGroupPopUp';
import AddLecturePopUp from '../components/pop-ups/AddLecturePopUp';
import AddLecturerPopUp from '../components/pop-ups/AddLecturerPopUp';
import AddStudentPopUp from '../components/pop-ups/AddStudentPopUp';
import DeleteSubjectPopUp from '../components/pop-ups/DeleteSubjectPopUp';
import DeleteLecturePopUp from '../components/pop-ups/DeleteLecturePopUp';
import AddSubjectPopUp from '../components/pop-ups/AddSubjectPopUp';
import Header from "components/Header";
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

function AdminPanel() {
  // const [grade, setGrade] = React.useState('');
  // const [name, setName] = React.useState('');
  // const [text, setText] = React.useState('');
  const [isPopupOpen, setIsPopupOpen] = React.useState(0);

  const handleOpenChangeSubject = () => setIsPopupOpen(1);
  const handleOpenAddGroup = () => setIsPopupOpen(2);
  const handleOpenAddLecturer = () => setIsPopupOpen(3);
  const handleOpenAddStudent = () => setIsPopupOpen(4);
  const handleOpenAddLecture = () => setIsPopupOpen(5);
  const handleOpenDeleteSubject = () => setIsPopupOpen(6);
  const handleOpenDeleteLecture = () => setIsPopupOpen(7);
  const handleOpenAddSubject = () => setIsPopupOpen(8);
  const modals = [null, ChangeSubjectPopUp, AddGroupPopUp, AddLecturerPopUp,
    AddStudentPopUp, AddLecturePopUp, DeleteSubjectPopUp, DeleteLecturePopUp, AddSubjectPopUp];

  /* async function handleClick() {
  const FormData = {
    someNumber: parseInt(grade),
    someText: name,
  };
  const response = await axios.post(
    'http://localhost:5001/api/testing/test-post-with-data',
    FormData,
  );
  const data = (await response.data) as string;

  setText(data);
  } */

  const SelectedModal = modals[isPopupOpen];

  /* input
    type="number"
    min={0}
    max={100}
    onChange={(e) => setGrade(e.target.value)}
    />
    <input type="text" onChange={(e) => setName(e.target.value)} />
    <Button variant='contained' onClick={handleClick}>кнопка</Button>
    <p>{text}</p>
  */

  return (
    <>
      <Header />
      <Box width={"90%"} margin="0 auto">
        <Typography variant='h3'>Админ-панель</Typography>
        <Box marginY={5} display={"flex"} gap={3} flexDirection={"column"}>
          <Box >
            <Button variant='contained' className="border border-gray-200 px-2 rounded-none" onClick={handleOpenChangeSubject}>
              Изменить дисциплину
            </Button>
          </Box>
          <Box>
            <Button variant='contained' className="border border-gray-200 px-2 rounded-none" onClick={handleOpenAddGroup}>
              Добавить группу
            </Button>
          </Box>
          <Box>
            <Button variant='contained' className="border border-gray-200 px-2 rounded-none" onClick={handleOpenAddLecturer}>
              Добавить преподавателя
            </Button>
          </Box>
          <Box>
            <Button variant='contained' className="border border-gray-200 px-2 rounded-none" onClick={handleOpenAddStudent}>
              Добавить студента
            </Button>
          </Box>
          <Box>
            <Button variant='contained' className="border border-gray-200 px-2 rounded-none" onClick={handleOpenAddLecture}>
              Добавить пару
            </Button>
          </Box>
          <Box>
            <Button variant='contained' className="border border-gray-200 px-2 rounded-none" onClick={handleOpenDeleteSubject}>
              Удалить дисциплину
            </Button>
          </Box>
          <Box>
            <Button variant='contained' className="border border-gray-200 px-2 rounded-none" onClick={handleOpenDeleteLecture}>
              Удалить пару
            </Button>
          </Box>
          <Box>
            <Button variant='contained' className="border border-gray-200 px-2 rounded-none" onClick={handleOpenAddSubject}>
              Добавить дисциплину
            </Button>
          </Box>
        </Box>
      </Box>
      {SelectedModal ? <SelectedModal open={Boolean(modals[isPopupOpen])} setOpen={setIsPopupOpen} /> : <></>}
    </>
  );
}

export default AdminPanel;