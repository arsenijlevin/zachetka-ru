import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const[text, setText] = React.useState("");

  async function handleClick() {
    const FormData = {
      someNumber: 111,
      someText: "aaa"
    }

    const response = await axios.post('http://localhost:5001/api/testing/test-post-with-data', FormData);
    const data = await response.data;

    setText(data);
  }

  return (
    <>
      <button onClick={handleClick}>кнопка</button>
      <p>{text}</p>
    </>
  )
}

export default App;
