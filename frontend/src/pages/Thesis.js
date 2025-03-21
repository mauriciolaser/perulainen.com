import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './Tesis.css';

const Thesis = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState([]);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [downloadCount, setDownloadCount] = useState(0);

  const fetchAllChapters = async () => {
    let allChapters = [];
    let currentPage = 1;
    let totalPages = 1;

    try {
      while (currentPage <= totalPages) {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}thesis`,
          {
            params: {
              per_page: 50, // Número máximo de resultados por página permitido por WordPress.
              page: currentPage,
            },
          }
        );

        allChapters = [...allChapters, ...response.data];
        totalPages = parseInt(response.headers['x-wp-totalpages'], 10);
        currentPage++;
      }

      // Ordenar capítulos por el campo "origin".
      const sortedChapters = allChapters.sort((a, b) => {
        const originA = parseInt(a.meta?.order || 0, 10);
        const originB = parseInt(b.meta?.order || 0, 10);
        return originA - originB;
      });

      setChapters(sortedChapters);

      if (!slug && sortedChapters.length > 0) {
        const defaultChapter = sortedChapters.find(
          (chapter) => chapter.slug === 'preface'
        );
        if (defaultChapter) {
          navigate(`/thesis/${defaultChapter.slug}`);
        }
      } else if (sortedChapters.length > 0) {
        const chapterBySlug = sortedChapters.find(
          (chapter) => chapter.slug === slug
        );
        setCurrentChapter(chapterBySlug);
      }
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };

  useEffect(() => {
    fetchAllChapters();
  }, [slug, navigate]);

  useEffect(() => {
    if (slug === 'preface') {
      axios
        .get(`${process.env.REACT_APP_DOWNLOAD_URL}count`)
        .then((response) => {
          if (response.data.success) {
            setDownloadCount(response.data.count);
          }
        })
        .catch((error) =>
          console.error('Error fetching download count:', error)
        );
    }
  }, [slug]);

  // Cambiar el título de la página dinámicamente
  useEffect(() => {
    document.title = "perulainen | Thesis";
  }, [slug]);

  const handleChapterChange = (newSlug) => {
    navigate(`/thesis/${newSlug}`);
  };

  const handleDownload = () => {
    if (window.gtag) {
      window.gtag('event', 'download', {
        event_category: 'Downloads',
        event_label: 'Thesis',
        value: 1,
      });
    }

    axios
      .post(`${process.env.REACT_APP_DOWNLOAD_URL}increment`)
      .then((response) => {
        if (response.data.success) {
          setDownloadCount(response.data.count);
        }
      })
      .catch((error) =>
        console.error('Error incrementing download count:', error)
      );
  };

  return (
    <Container fluid className="mt-5 px-3 px-md-4 px-lg-6">
      <Row>
        <Col md={4} className="bg-light sidebar">
          <h5 className="my-3">Chapters</h5>
          <ul className="list-unstyled">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <button
                  onClick={() => handleChapterChange(chapter.slug)}
                  className={`d-block w-100 text-start py-2 px-3 ${
                    currentChapter?.slug === chapter.slug ? 'active' : ''
                  }`}
                  style={{
                    textDecoration: 'none',
                    border: 'none',
                    background:
                      currentChapter?.slug === chapter.slug
                        ? '#e9ecef'
                        : 'transparent',
                    color:
                      currentChapter?.slug === chapter.slug ? '#007bff' : '#000',
                    cursor: 'pointer',
                  }}
                >
                  {chapter.title.rendered}
                </button>
              </li>
            ))}
          </ul>
        </Col>

        <Col md={8} className="p-4 content">
          {currentChapter ? (
            <>
              <h2 className="text-left">{currentChapter.title.rendered}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: currentChapter.content.rendered,
                }}
              />
            </>
          ) : (
            <p className="text-left">Loading content.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Thesis;
