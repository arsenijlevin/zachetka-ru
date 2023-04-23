import React, { useRef } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const[grade, setGrade] = React.useState("");
  const[name, setName] = React.useState("");
  const[text, setText] = React.useState("");


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
      <input type='number' min={0} max={100}  onChange={e => setGrade(e.target.value)}/>
      <input type='text' onChange={e => setName(e.target.value)}/>
      <button onClick={handleClick}>кнопка</button>
      <p>{text}</p>
    </>
  )
}

export default App;
