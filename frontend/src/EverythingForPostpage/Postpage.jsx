import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NAVBAR from '../SharedComponents/NavbarComponent.jsx';
import { useAuth } from '../SharedComponents/authContext.jsx';

function Postpage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('Distro for Gaming');
  const [content, setContent] = useState('Im seasrching for a distro!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  console.log(useAuth());

  const handleBack = () => {
    // Navigate back or to a specific page
    navigate(-1); // Goes back in history
    // OR navigate to a specific route: navigate('/forum');
  };

  const handleSave = async () => {
    // Basic validation
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    if (title.length > 60) {
      setError('Title must be 60 characters or less');
      return;
    }

    setLoading(true);
    setError('');

    try {

      const postData = {
        username: user.username,
        title: title.trim(),
        content: content.trim(),
      };

      const responseGet = await fetch('http://localhost:3100/forum/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(responseGet);

      // Send POST request to backend
      const response = await fetch('http://localhost:3100/forum/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      if (response.status === 200 || response.status === 201) {
        // Navigate to another page after successful post
        navigate('/account'); // Change this to your desired route
        // OR navigate(`/post/${response.data.id}`); // If your backend returns the post ID
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setError('Failed to save post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NAVBAR />
      <div
        className='container d-flex flex-column gap-2'
        style={{ color: '#004E72', marginTop: '8rem', padding: '0rem 10rem' }}
      >
        <h3>Post</h3>
        <p>Write you post here:</p>
        <div>
          <label className='form-label'>
            <b>Title</b>
          </label>
          <input
            type='text'
            className='form-control'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={60}
            style={{ boxShadow: '0px 0px 10px -5px black inset' }}
            disabled={loading}
          />
        </div>
        <div>
          <label className='form-label'>
            <b>Content</b>
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='form-control'
            style={{ height: '150px', boxShadow: '0px 0px 10px -5px black inset' }}
            disabled={loading}
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
            onClick={handleBack}
            disabled={loading}
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
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className='spinner-border spinner-border-sm me-2'
                  role='status'
                  aria-hidden='true'
                ></span>
                Saving...
              </>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default Postpage;
