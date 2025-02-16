import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLinkedin, FaGithub } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <div className="d-flex justify-content-center">
          <a
            href="https://www.linkedin.com/in/mauriciocastrovaldez/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-3"
          >
            <FaLinkedin size={30} />
          </a>
          <a
            href="https://github.com/mauriciolaser"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-3"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://bsky.app/profile/perulainen.bsky.social"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white mx-3"
          >
            <img
              src="/Bluesky_Logo.svg"
              alt="Bluesky Logo"
    style={{
      width: '30px',
      height: '30px',
      filter: 'brightness(0) invert(1)', // Cambia cualquier color a blanco
    }}
            />
          </a>
        </div>
        <p className="mt-3 mb-0">
  © {new Date().getFullYear()}{' '}
  <a 
    href="https://www.castrovaldez.com" 
    target="_blank" 
    rel="noopener noreferrer" 
    style={{ textDecoration: 'none', color: 'inherit' }}
  >
    Mauricio Castro Valdez
  </a>
</p>

      </div>
    </footer>
  );
};

export default Footer;
