import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';


const Blog = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the API
  useEffect(() => {
    axios
      .get('https://www.perulainen.com/cms/wp-json/wp/v2/posts/')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  // Helper function to truncate content to 160 characters
  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

    useEffect(() => {
      document.title = "perulainen | Blog";
    }, []);

  return (
    <Container className='blog-container'>
      <h1 className="my-4">Blog</h1>
      <Row>
        {posts.map((post) => (
          <Col key={post.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{post.title.rendered}</Card.Title>
                <Card.Text>
                  {truncateText(post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, ''), 160)}
                </Card.Text>
                <Link to={`/post/${post.id}`} className="btn btn-primary">
                  Read More
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Blog;
