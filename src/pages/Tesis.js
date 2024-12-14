import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './Tesis.css';


const Tesis = () => {
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(null);

  // Fetch chapters data from API
  useEffect(() => {
    axios.get('https://www.perulainen.com/cms/wp-json/wp/v2/tesis')
      .then(response => {
        // Sort chapters by the "origin" field (assuming it's a number)
        const sortedChapters = response.data.sort((a, b) => {
          const originA = parseInt(a.meta?.order || 0, 10);
          const originB = parseInt(b.meta?.order || 0, 10);
          return originA - originB;
        });

        setChapters(sortedChapters);
        if (sortedChapters.length > 0) {
          setCurrentChapter(sortedChapters[0]); // Default to the first chapter
        }
      })
      .catch(error => {
        console.error('Error fetching chapters:', error);
      });
  }, []);

  // Handler for changing the current chapter
  const handleChapterChange = (chapterId) => {
    const chapter = chapters.find(c => c.id === chapterId);
    setCurrentChapter(chapter);
  };

  return (
    <Container fluid className="mt-5 px-3 px-md-4 px-lg-5">
      <Row>
        {/* Sidebar Navigation */}
        <Col md={3} className="bg-light sidebar">
          <h5 className="my-3">Capítulos</h5>
          <ul className="list-unstyled">
            {chapters.map(chapter => (
              <li key={chapter.id}>
                <button
                  onClick={() => handleChapterChange(chapter.id)}
                  className={`d-block w-100 text-start py-2 px-3 ${
                    currentChapter?.id === chapter.id ? 'active' : ''
                  }`}
                  style={{
                    textDecoration: 'none',
                    border: 'none',
                    background: currentChapter?.id === chapter.id ? '#e9ecef' : 'transparent',
                    color: currentChapter?.id === chapter.id ? '#007bff' : '#000',
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
              <div
                dangerouslySetInnerHTML={{ __html: currentChapter.content.rendered }}
              />
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
