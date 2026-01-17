import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NAVBAR from '../SharedComponents/NavbarComponent.jsx';

function Commentpage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Lade Post und Comments
  useEffect(() => {
    Promise.all([
      fetch(`http://localhost:3100/forum/posts/${postId}`, { credentials: 'include' }),
      fetch(`http://localhost:3100/forum/posts/${postId}/comments`, { credentials: 'include' })
    ])
      .then(([postRes, commentsRes]) => {
        if (!postRes.ok || !commentsRes.ok) throw new Error('Failed to fetch data');
        return Promise.all([postRes.json(), commentsRes.json()]);
      })
      .then(([postData, commentsData]) => {
        setPost(postData);
        setComments(commentsData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [postId]);

  // Kommentar absenden
  const handleSubmitComment = async () => {
    if (!newComment.trim()) {
      alert('Bitte schreibe einen Kommentar');
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

      const newCommentData = await response.json();
      
      // Kommentar zur Liste hinzufügen
      setComments([...comments, newCommentData]);
      setNewComment('');
      alert('Kommentar erfolgreich gepostet!');
    } catch (err) {
      alert('Fehler beim Posten des Kommentars: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Datum formatieren
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('de-DE'),
      time: date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    };
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

  const postDate = formatDate(post.timestamp);

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
            <span className='me-5'>{post.author?.username || 'Anonymous'}</span>
            <span>{postDate.date}</span>
            <span>{postDate.time}</span>
          </div>
          <p>{post.content}</p>
        </div>

        {/* Bestehende Kommentare anzeigen */}
        {comments.length > 0 && (
          <div className='d-flex flex-column gap-3'>
            <h5>Kommentare ({comments.length})</h5>
            {comments.map((comment) => {
              const commentDate = formatDate(comment.timestamp);
              return (
                <div 
                  key={comment.id} 
                  className='p-3 border rounded'
                  style={{ backgroundColor: '#f8f9fa' }}
                >
                  <div className='d-flex gap-3 mb-2' style={{ fontSize: '0.9rem' }}>
                    <span><b>{comment.author?.username || 'Anonymous'}</b></span>
                    <span className='text-muted'>{commentDate.date}</span>
                    <span className='text-muted'>{commentDate.time}</span>
                    {comment.edited_at && (
                      <span className='text-muted fst-italic'>(bearbeitet)</span>
                    )}
                  </div>
                  <p className='mb-0'>{comment.content}</p>
                </div>
              );
            })}
          </div>
        )}

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
              placeholder='Schreibe deinen Kommentar...'
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
              onClick={() => navigate('/forum')}
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
              {submitting ? 'Wird gepostet...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Commentpage;