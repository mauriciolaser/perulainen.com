import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa createRoot de React 18
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

console.log("Aplicación iniciada");

// Obtiene el elemento raíz del DOM
const rootElement = document.getElementById('root');

// Crea el root y renderiza la aplicación
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
