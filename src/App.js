import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import Post from './pages/Post';
import Tesis from './pages/Tesis';
import Blog from './pages/Blog'; // Importa Blog

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <NavigationBar />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/tesis" element={<Tesis />} />
          <Route path="/blog" element={<Blog />} /> {/* Nueva ruta */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
