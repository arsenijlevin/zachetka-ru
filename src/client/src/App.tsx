import React from 'react';
import './App.css';
import axios from 'axios';
import ChangeSubjectPopUp from './components/pop-ups/ChangeSubjectPopUp';

function App() {
  const[grade, setGrade] = React.useState("");
  const[name, setName] = React.useState("");
  const[text, setText] = React.useState("");
  const[isPopupOpen, setIsPopupOpen] = React.useState(false);

  async function handleClick() {
    
    const FormData = {
      someNumber: parseInt(grade),
      someText: name
    }
    const response = await axios.post('http://localhost:5001/api/testing/test-post-with-data', FormData);
    const data = await response.data;
    
    setText(data);
  }

  return (
    <>
      <input type='number' min={0} max={100} onChange={e => setGrade(e.target.value)}/>
      <input type='text' onChange={e => setName(e.target.value)}/>
      <button onClick={handleClick}>кнопка</button>
      <p>{text}</p>

      <button className='border border-gray-200 px-2' onClick={() => {setIsPopupOpen(true)}}>Изменить дисциплину</button>
      <button className='border border-gray-200 px-2 ml-5' onClick={() => {setIsPopupOpen(false)}}>Закрыть pop-up</button>

      {isPopupOpen ? <ChangeSubjectPopUp/> : <></>} 

    </>
  )
}

export default App;
