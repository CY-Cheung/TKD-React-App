import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scoreboard from './kyorugi/scoreboard/scoreboard';
import Remote from './kyorugi/remote/remote';
import NewMatch from './kyorugi/newMatch/newMatch';

export default function App() {
  return (
    <React.StrictMode>
      <Router>
        <div className="App">
          <Routes>
          <Route path="/" element={<NewMatch />} />
          <Route path="/newmatch" element={<NewMatch />} />
            <Route path="/scoreboard" element={<Scoreboard />} />
            <Route path="/remote" element={<Remote />} />
          </Routes>
        </div>
      </Router>
    </React.StrictMode>
  );
}