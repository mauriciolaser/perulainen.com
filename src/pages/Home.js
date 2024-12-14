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
    axios.get('https://www.perulainen.com/cms/wp-json/wp/v2/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // Fetch Thesis Data
  useEffect(() => {
    axios.get('https://www.perulainen.com/cms/wp-json/wp/v2/thesis')
      .then(response => {
        setThesis(response.data);
      })
      .catch(error => {
        console.error('Error fetching thesis:', error);
      });
  }, []);

  // Fetch Tesis Data
  useEffect(() => {
    axios.get('https://www.perulainen.com/cms/wp-json/wp/v2/tesis')
      .then(response => {
        setTesis(response.data);
      })
      .catch(error => {
        console.error('Error fetching tesis:', error);
      });
  }, []);

  return (
    <Container>
      <Row>
        {/* Card for Posts */}
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Posts</Card.Title>
              <Card.Text>
                My blog posts.
              </Card.Text>
              <Link to="/" className="btn btn-primary">View Posts</Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Card for Thesis 
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Thesis</Card.Title>
              <Card.Text>
                Read my thesis in english.
              </Card.Text>
              <Link to="/thesis" className="btn btn-primary">View Thesis</Link>
            </Card.Body>
          </Card>
        </Col> */}

        {/* Card for Tesis */}
        <Col md={4} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Tesis</Card.Title>
              <Card.Text>
                Leer mi tesis en español.
              </Card.Text>
              <Link to="/tesis" className="btn btn-primary">View Tesis</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
};

export default Home;
