import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/Navbar';
import Footer from './components/Footer'; // Importa el Footer
import Home from './pages/Home';
import Post from './pages/Post';
import Tesis from './pages/Tesis';
import Thesis from './pages/Thesis';
import Blog from './pages/Blog';

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navbar */}
        <NavigationBar />

        {/* Main content */}
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/tesis" element={<Tesis />} />
            <Route path="/tesis/:slug" element={<Tesis />} /> {/* Ruta para slugs */}
            <Route path="/thesis" element={<Thesis />} />
            <Route path="/thesis/:slug" element={<Thesis />} /> {/* Ruta para slugs */}
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
