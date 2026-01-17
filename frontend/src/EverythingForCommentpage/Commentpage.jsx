import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NAVBAR from '../SharedComponents/NavbarComponent.jsx';

function Commentpage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Load Post
  useEffect(() => {
    if (!postId) {
      navigate('/');
    }

    fetchPost(postId)
  }, [postId]);

  const fetchPost = async (id) => {
    if (!id) return;

    setLoading(true);
    setError(null);

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
      setError('Could not load the post. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Kommentar absenden
  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      alert('Please write your comment!');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`http://localhost:3100/forum/posts/${postId}/comments`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment
        })
      });

      if (!response.ok) throw new Error('Failed to post comment');
      else navigate(`/post/${postId}`);

      alert('Comment posted sucessfully!');
    } catch (err) {
      alert('Error in posting a comment: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <NAVBAR />
        <div className="container mt-5 text-center">
          <div className="spinner-border" />
        </div>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <NAVBAR />
        <div className="container mt-5">
          <div className="alert alert-danger">
            {error || 'Post nicht gefunden'}
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/forum')}>
            Zurück zum Forum
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <NAVBAR />

      <div
        className='container d-flex flex-column gap-5'
        style={{ color: '#004E72', marginTop: '8rem', padding: '0rem 10rem' }}
      >
        {/* Post anzeigen */}
        <div className='d-flex flex-column gap-2'>
          <h4>{post.title}</h4>
          <div className='d-flex gap-3 mb-3'>
            <span className='me-5'>{post.author.username}</span>
            <span>{post.date}</span>
          </div>
          <p>{post.content}</p>
        </div>

        {/* Neuen Kommentar schreiben */}
        <div className='d-flex flex-column gap-2'>
          <h4>Comment</h4>
          <p>Write your comment here:</p>
          <div>
            <label className='form-label'>
              <b>Content</b>
            </label>
            <textarea
              className='form-control'
              style={{ height: '150px', boxShadow: '0px 0px 10px -5px black inset' }}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder='Write your comment...'
              disabled={submitting}
            ></textarea>
          </div>
          <div className='d-flex flex-row justify-content-end gap-4 mt-3'>
            <button
              className='btn btn-primary px-4 py-2'
              style={{
                background: 'transparent',
                color: '#004E72',
                borderColor: '#004E72',
                borderRadius: '0.6rem',
              }}
              onClick={() => navigate(`/post/${postId}`)}
              disabled={submitting}
            >
              Back
            </button>
            <button
              className='btn btn-primary px-4 py-2'
              style={{
                background: '#004E72',
                color: '#FEFEFE',
                borderRadius: '0.6rem',
              }}
              onClick={handleSubmitComment}
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Commentpage;