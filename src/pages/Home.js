import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://www.perulainen.com/cms/wp-json/wp/v2/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <Container>
      <Row>
        {posts.map(post => (
          <Col key={post.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{post.title.rendered}</Card.Title>
                <Card.Text>
                  <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                </Card.Text>
                <Link to={`/post/${post.id}`} className="btn btn-primary">Read More</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
