import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './Post.css';

const Post = () => {
  const { slug } = useParams(); // Extraemos "slug" desde la URL
  const [post, setPost] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}posts`,
          {
            params: {
              slug: slug, // Ahora usamos el "slug" correctamente
              _embed: true
            }
          }
        );

        if (postResponse.data.length > 0) {
          setPost(postResponse.data[0]); // La API devuelve un array, tomamos el primer elemento
        } else {
          console.error('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPostData();
  }, [slug]); // Se usa "slug" como dependencia

  if (!post) {
    return (
      <Container className="post-container">
        <div className="loading-spinner text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="post-container">
      <article>
        <h1 className="post-title">{post.title.rendered}</h1>

        {featuredImage && (
          <a
            href={featuredImage.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="image-modal-trigger"
          >
            <img
              src={featuredImage.source_url}
              alt={featuredImage.alt_text || post.title.rendered}
              className="img-fluid featured-image mb-4"
            />
          </a>
        )}

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <div className="post-meta mt-5 pt-4 border-top">
          <p className="text-muted small">
            Published: {new Date(post.date).toLocaleDateString('en-EN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </article>
    </Container>
  );
};

export default Post;
