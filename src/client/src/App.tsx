import React from 'react';
import './App.css';
import axios from 'axios';
import ChangeSubjectPopUp from './components/pop-ups/ChangeSubjectPopUp';
import AddGroupPopUp from './components/pop-ups/AddGroupPopUp';

function App() {
  const [grade, setGrade] = React.useState('');
  const [name, setName] = React.useState('');
  const [text, setText] = React.useState('');
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const [isAddGroupPopupOpen, setIsAddGroupPopupOpen] = React.useState(false);

  const handleOpen = () => setIsPopupOpen(true);
  const handleAddGroupOpen = () => setIsAddGroupPopupOpen(true);

  async function handleClick() {
    const FormData = {
      someNumber: parseInt(grade),
      someText: name,
    };
    const response = await axios.post(
      'http://localhost:5001/api/testing/test-post-with-data',
      FormData,
    );
    const data = await response.data as string;

    setText(data);
  }

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

      <button
        className="border border-gray-200 px-2"
        onClick={() => {
          setIsPopupOpen(true);
        }}
      >
        Изменить дисциплину
      </button>
      <button
        className="border border-gray-200 px-2 ml-5"
        onClick={() => {
          setIsPopupOpen(false);
        }}
      >
        Закрыть pop-up
      </button>
      <div>
        <button className="border border-gray-200 px-2" onClick={handleOpen}>
          Изменить дисциплину
        </button>
      </div>
      <div>
        <button className="border border-gray-200 px-2" onClick={handleAddGroupOpen}>
          Добавить группу
        </button>
      </div>

      {isPopupOpen ? <ChangeSubjectPopUp open={isPopupOpen} setOpen={setIsPopupOpen}/> : <></>}
      {isAddGroupPopupOpen ? <AddGroupPopUp open={isAddGroupPopupOpen} setOpen={setIsAddGroupPopupOpen}/> : <></>}
    </>
  );
}

export default App;
