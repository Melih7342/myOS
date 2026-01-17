import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NAVBAR from '../SharedComponents/NavbarComponent.jsx';
import { useAuth } from '../SharedComponents/authContext';

function PostReviewpage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState();
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState(null);
  const [comments, setComments] = useState();
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(null);

  useEffect(() => {
    if (!id) {
      navigate('/');
    }

    if (user === null) {
      return;
    }

    // Fetch post and its comments
    fetchPost(id);
    fetchComments(id);
  }, [id, user, navigate]);

  const fetchPost = async (id) => {
    if (!id) return;

    setPostLoading(true);
    setPostError(null);

    try {
      // the url could be different!!!
      const response = await fetch(`http://localhost:3100/forum/posts/${id}`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch the post: ${response.status}`);
      }

      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching the post:', error);
      setPostError('Could not load the post. Please try again later.');
    } finally {
      setPostLoading(false);
    }
  };

  const fetchComments = async (id) => {
    if (!id) return;

    setCommentsLoading(true);
    setCommentsError(null);

    try {
      // the url could be different!!!
      const response = await fetch(`http://localhost:3100/forum/posts/${id}/comments`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch the comments for the post: ${response.status}`);
      }

      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching the comments for the post:', error);
      setCommentsError('Could not load the comments for the post. Please try again later.');
    } finally {
      setCommentsLoading(false);
    }
  };

  // To delete the post.
  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3100/forum/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(user),
      });

      if (response.ok) {
        navigate('/account');
      } else {
        alert('Error deleting post.');
      }
    } catch (error) {
      console.error('Delete Error:', error);
      alert('Network error.');
    }
  };

  // To delete the comment.
  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:3100/forum/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(user),
      });

      if (response.ok) {
        fetchComments(id);
      } else {
        alert('Error deleting comment.');
      }
    } catch (error) {
      console.error('Delete Error:', error);
      alert('Network error.');
    }
  };

  // Datum formatieren
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('de-DE'),
      time: date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  // Get formatted post date only if post exists
  const postDate = post ? formatDate(post.timestamp) : { date: '', time: '' };

  return (
    <>
      <NAVBAR />

      <div
        className='container d-flex flex-column gap-3'
        style={{ color: '#004E72', marginTop: '8rem', padding: '0rem 10rem' }}
      >
        {postLoading ? (
          <div>The Post is Loading ...</div>
        ) : postError ? (
          <div>{postError}</div>
        ) : (
          <div className='d-flex flex-column gap-2'>
            <h4>{post.title}</h4>
            <div className='d-flex gap-3 mb-3'>
              <span className='me-5'>{post.author.username}</span>
              <span>{postDate.date}</span>
              <span>{postDate.time}</span>
            </div>
            <p>{post.content}</p>

            {user.username === post.author.username ? (
              <div className='d-flex flex-row justify-content-end gap-4 mb-4'>
                <button
                  className='btn btn-primary px-4 py-2'
                  style={{
                    background: 'transparent',
                    color: '#004E72',
                    borderColor: '#004E72',
                    borderRadius: '0.6rem',
                  }}
                  onClick={() => navigate(`/postEdit/${post.id}`)}
                >
                  Edit
                </button>
                <button
                  className='btn btn-primary px-4 py-2'
                  style={{
                    background: 'transparent',
                    color: '#FF2132',
                    borderColor: '#FF2132',
                    borderRadius: '0.6rem',
                  }}
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            ) : (
              <div className='d-flex flex-row justify-content-end gap-4 mb-4'>
                <button
                  className='btn btn-primary px-4 py-2'
                  style={{
                    background: 'transparent',
                    color: '#004E72',
                    borderColor: '#004E72',
                    borderRadius: '0.6rem',
                  }}
                  onClick={() => navigate(`/post/${post.id}/comment`)}
                >
                  Comment
                </button>
              </div>
            )}
          </div>
        )}
        {commentsLoading ? (
          <div>The Comments are Loading ...</div>
        ) : commentsError ? (
          <div>{commentsError}</div>
        ) : comments.length === 0 ? (
          <div>
            <h5>Comments</h5>
            <p>No comment is still for this post yet.</p>
          </div>
        ) : (
          <div className='d-flex flex-column gap-2'>
            <h5>Comments</h5>
            <div className='d-flex flex-column gap-4'>
              {comments.map((comment) => {
                // Format each comment's date
                const commentDate = formatDate(comment.timestamp);
                return (
                  <div key={comment.id}>
                    <div className='d-flex gap-3 mb-3'>
                      <span className='me-5'>{comment.author.username}</span>
                      <span>{commentDate.date}</span>
                      <span>{commentDate.time}</span>
                    </div>
                    <p>{comment.content}</p>
                    {user.username === comment.author.username ? (
                      <div className='d-flex flex-row justify-content-end gap-4 mb-4'>
                        <button
                          className='btn btn-primary px-4 py-2'
                          style={{
                            background: 'transparent',
                            color: '#004E72',
                            borderColor: '#004E72',
                            borderRadius: '0.6rem',
                          }}
                          onClick={() => navigate(`/post/${post.id}/comment/${comment.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className='btn btn-primary px-4 py-2'
                          style={{
                            background: 'transparent',
                            color: '#FF2132',
                            borderColor: '#FF2132',
                            borderRadius: '0.6rem',
                          }}
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PostReviewpage;
