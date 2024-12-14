import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Post from './pages/Post';
import Tesis from './pages/Tesis';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/tesis" element={<Tesis />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
