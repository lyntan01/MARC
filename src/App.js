import React, { useState, useEffect } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  const [trashCategory, setTrashCategory] = useState("");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    fetch('/result').then(response => response.json()).then(data => {
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
