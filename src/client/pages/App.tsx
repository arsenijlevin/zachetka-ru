import React from 'react';
import axios from 'axios';
import ChangeSubjectPopUp from '../components/pop-ups/ChangeSubjectPopUp';
import AddGroupPopUp from '../src/components/pop-ups/AddGroupPopUp';
import AddLecturePopUp from '../src/components/pop-ups/AddLecturePopUp';
import AddLecturerPopUp from '../src/components/pop-ups/AddLecturerPopUp';
import AddStudentPopUp from '../src/components/pop-ups/AddStudentPopUp';


function App() {
  const [grade, setGrade] = React.useState('');
  const [name, setName] = React.useState('');
  const [text, setText] = React.useState('');
  const [isPopupOpen, setIsPopupOpen] = React.useState(0);

  const handleOpenChangeSubject = () => setIsPopupOpen(1);
  const handleOpenAddGroup = () => setIsPopupOpen(2);
  const handleOpenAddLecturer = () => setIsPopupOpen(3);
  const handleOpenAddStudent = () => setIsPopupOpen(4);
  const handleOpenAddLecture = () => setIsPopupOpen(5);
  const modals = [null, ChangeSubjectPopUp, AddGroupPopUp, AddLecturerPopUp, AddStudentPopUp, AddLecturePopUp];

  async function handleClick() {
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
  }

  const SelectedModal = modals[isPopupOpen];

  return (
    <>
      <input
        type="number"
        min={0}
        max={100}
        onChange={(e) => setGrade(e.target.value)}
      />
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <button onClick={handleClick}>кнопка</button>
      <p>{text}</p>
      <div>
        <button className="border border-gray-200 px-2" onClick={handleOpenChangeSubject}>
          Изменить дисциплину
        </button>
      </div>
      <div>
        <button className="border border-gray-200 px-2" onClick={handleOpenAddGroup}>
          Добавить группу
        </button>
      </div>
      <div>
        <button className="border border-gray-200 px-2" onClick={handleOpenAddLecturer}>
          Добавить преподавателя
        </button>
      </div>
      <div>
        <button className="border border-gray-200 px-2" onClick={handleOpenAddStudent}>
          Добавить студента
        </button>
      </div>
      <div>
        <button className="border border-gray-200 px-2" onClick={handleOpenAddLecture}>
          Добавить пару
        </button>
      </div>

      {SelectedModal ? <SelectedModal open={true} setOpen={setIsPopupOpen}/> : <></>}
    </>
  );
}

export default App;
