import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './Post.css';

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);

  useEffect(() => {
    if (!slug) return; // Si no hay slug, no hace nada

    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}posts`,
          {
            params: {
              slug: slug,
              _embed: true,
            },
          }
        );

        // Si se encuentra algún post, guardamos el primero
        if (response.data.length > 0) {
          const fetchedPost = response.data[0];
          setPost(fetchedPost);

          // Si existe una imagen destacada, la guardamos
          if (
            fetchedPost._embedded &&
            fetchedPost._embedded['wp:featuredmedia'] &&
            fetchedPost._embedded['wp:featuredmedia'][0]
          ) {
            setFeaturedImage(fetchedPost._embedded['wp:featuredmedia'][0]);
          }
        } else {
          console.error('Post not found');
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPostData();
  }, [slug]);

  // Mientras no se disponga del post o de su título, mostramos un spinner
  if (!post || !post.title) {
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
        <h1 className="post-title">{post?.title?.rendered || 'Sin título'}</h1>

        {featuredImage && (
          <a
            href={featuredImage.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="image-modal-trigger"
          >
            <img
              src={featuredImage.source_url}
              alt={featuredImage?.alt_text || post?.title?.rendered}
              className="img-fluid featured-image mb-4"
            />
          </a>
        )}

        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post?.content?.rendered || '' }}
        />

        <div className="post-meta mt-5 pt-4 border-top">
          <p className="text-muted small">
            Published:{' '}
            {new Date(post.date).toLocaleDateString('en-EN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </article>
    </Container>
  );
};

export default Post;
