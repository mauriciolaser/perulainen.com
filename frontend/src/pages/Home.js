import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [thesis, setThesis] = useState([]);
  const [tesis, setTesis] = useState([]);

  // Fetch Posts Data
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}posts/`)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // Fetch Thesis Data
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}thesis/`)
      .then(response => {
        setThesis(response.data);
      })
      .catch(error => {
        console.error('Error fetching thesis:', error);
      });
  }, []);

  // Fetch Tesis Data
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}tesis/`)
      .then(response => {
        setTesis(response.data);
      })
      .catch(error => {
        console.error('Error fetching tesis:', error);
      });
  }, []);

  // Change document title dynamically
  useEffect(() => {
    document.title = "perulainen | Home";
  }, []);

  return (
    <Container className='home-container'>
      {/* Welcome Paragraph */}
      <Row className="my-4">
        <Col>
          <h1>¡Hola!</h1>
          <p>
            Welcome to my personal website. Here, you can explore my blog posts, read my thesis in Spanish, 
            or in English.
          </p>
        </Col>
      </Row>

      <Row>
        {/* Card for Posts */}
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Blog</Card.Title>
              <Card.Text>
                Check my blog.
              </Card.Text>
              <Link to="/blog" className="btn btn-primary">View Posts</Link>
            </Card.Body>
          </Card>
        </Col>

        {/*Card for Thesis*/} 
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Thesis</Card.Title>
              <Card.Text>
                Read my thesis in English.
              </Card.Text>
              <Link to="/thesis" className="btn btn-primary">View Thesis</Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Card for Tesis */}
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Tesis</Card.Title>
              <Card.Text>
                Leer mi tesis en castellano.
              </Card.Text>
              <Link to="/tesis/prefacio" className="btn btn-primary">Ver Tesis</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
