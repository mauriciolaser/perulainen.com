import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useParams y useNavigate
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './Tesis.css';

const Tesis = () => {
  const { slug } = useParams(); // Obtén el slug de la URL
  const navigate = useNavigate(); // Hook para cambiar el URL
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [downloadCount, setDownloadCount] = useState(0); // Estado para el contador de descargas

  // Fetch chapters data from API
  useEffect(() => {
    axios
      .get('https://www.perulainen.com/cms/wp-json/wp/v2/tesis')
      .then((response) => {
        // Sort chapters by the "origin" field (assuming it's a number)
        const sortedChapters = response.data.sort((a, b) => {
          const originA = parseInt(a.meta?.order || 0, 10);
          const originB = parseInt(b.meta?.order || 0, 10);
          return originA - originB;
        });

        setChapters(sortedChapters);

        // Find and set the chapter based on the slug from the URL
        if (slug) {
          const chapterBySlug = sortedChapters.find((chapter) => chapter.slug === slug);
          setCurrentChapter(chapterBySlug);
        } else if (sortedChapters.length > 0) {
          setCurrentChapter(sortedChapters[0]); // Default to the first chapter
        }
      })
      .catch((error) => {
        console.error('Error fetching chapters:', error);
      });
  }, [slug]); // Refetch when slug changes

  // Fetch the download count for the single record
  useEffect(() => {
    if (slug === 'prefacio') {
      axios
        .get('https://www.perulainen.com/cms/wp-json/downloads/v1/count')
        .then((response) => {
          if (response.data.success) {
            setDownloadCount(response.data.count);
          }
        })
        .catch((error) => console.error('Error fetching download count:', error));
    }
  }, [slug]);

  // Handle chapter change
  const handleChapterChange = (newSlug) => {
    navigate(`/tesis/${newSlug}`); // Cambia el URL dinámicamente
  };

  // Handle file download
  const handleDownload = () => {
    if (window.gtag) {
      // Enviar evento a Google Analytics
      window.gtag('event', 'download', {
        event_category: 'Downloads',
        event_label: 'Tesis',
        value: 1,
      });
    }

    // Incrementar el contador en WordPress
    axios
      .post('https://www.perulainen.com/cms/wp-json/downloads/v1/increment')
      .then((response) => {
        if (response.data.success) {
          setDownloadCount(response.data.count);
        }
      })
      .catch((error) => console.error('Error incrementing download count:', error));
  };

  return (
    <Container fluid className="mt-5 px-3 px-md-4 px-lg-5">
      <Row>
        {/* Sidebar Navigation */}
        <Col md={3} className="bg-light sidebar">
          <h5 className="my-3">Capítulos</h5>
          <ul className="list-unstyled">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <button
                  onClick={() => handleChapterChange(chapter.slug)} // Usa el slug
                  className={`d-block w-100 text-start py-2 px-3 ${
                    currentChapter?.slug === chapter.slug ? 'active' : ''
                  }`}
                  style={{
                    textDecoration: 'none',
                    border: 'none',
                    background: currentChapter?.slug === chapter.slug ? '#e9ecef' : 'transparent',
                    color: currentChapter?.slug === chapter.slug ? '#007bff' : '#000',
                    cursor: 'pointer',
                  }}
                >
                  {chapter.title.rendered}
                </button>
              </li>
            ))}
          </ul>
        </Col>

        {/* Main Content */}
        <Col md={9} className="p-4">
          {currentChapter ? (
            <>
              <h2 className="text-left">{currentChapter.title.rendered}</h2>
              <div dangerouslySetInnerHTML={{ __html: currentChapter.content.rendered }} />

              {/* Mostrar el enlace de descarga solo en el capítulo Prefacio */}
              {currentChapter.slug === 'prefacio' && (
                <div className="mt-4">
                  <a
                    href="/CastroValdezMauricio.pdf"
                    onClick={handleDownload}
                    download
                  >
                    Descargar Tesis
                  </a>
                  <span> ({downloadCount} descargas)</span>
                </div>
              )}
            </>
          ) : (
            <p className="text-left">Seleccione un capítulo de la lista.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Tesis;
