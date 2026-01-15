import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NAVBAR from '../SharedComponents/NavbarComponent.jsx';

function Commentpage() {
  const navigate = useNavigate();

  return (
    <>
      <NAVBAR />

      <div
        className='container d-flex flex-column gap-5'
        style={{ color: '#004E72', marginTop: '8rem', padding: '0rem 10rem' }}
      >
        <div className='d-flex flex-column gap-2'>
          <h4>Which Linux Distro for Gaming</h4>
          <div className='d-flex gap-3 mb-3'>
            <span className='me-5'>melih89</span>
            <span>14.01.2026</span>
            <span>17:02</span>
          </div>
          <p>
            Im looking for a distribution that works best with Steam and Nvidia drivers. Any
            suggestions?
          </p>
        </div>
        <div
          className='d-flex flex-column gap-2'
        >
          <h4>Commment</h4>
          <p>Write you comment here:</p>
          <div>
            <label className='form-label'>
              <b>Content</b>
            </label>
            <textarea
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
      </div>
    </>
  );
}

export default Commentpage;
