import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NAVBAR from '../SharedComponents/NavbarComponent.jsx';

function Postpage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('Distro for Gaming');
  const [content, setContent] = useState("Im seasrching for a distro!");

  return (
    <>
      <NAVBAR />
      <div
        className='container d-flex flex-column gap-2'
        style={{ color: '#004E72', marginTop: '8rem', padding: '0rem 10rem'}}
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
            maxLength={60}
            style={{ boxShadow: '0px 0px 10px -5px black inset' }}
          />
        </div>
        <div>
          <label className='form-label'>
            <b>Content</b>
          </label>
          <textarea
            value={content}
            class='form-control'
            style={{ height: '150px', boxShadow: '0px 0px 10px -5px black inset' }}
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
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default Postpage;
