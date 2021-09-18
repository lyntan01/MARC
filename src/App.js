import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [trashCategory, setTrashCategory] = useState("");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    fetch('/home').then(response => response.json()).then(data => {
      setTrashCategory(data.prediction);
      setPoints(data.points);
    });
  }, []);

  return (
    <div className="App">
      <h2>You have thrown an item that is {trashCategory}.</h2>
      <h3>You have earned {points} points.</h3>
    </div>
  );
}

export default App;
