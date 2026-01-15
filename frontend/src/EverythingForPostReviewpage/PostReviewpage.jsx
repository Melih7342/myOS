import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NAVBAR from '../SharedComponents/NavbarComponent.jsx';

function Postpage() {
  const navigate = useNavigate();

  return (
    <>
      <NAVBAR />

      <div
        className='container d-flex flex-column gap-3'
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
          <div className='d-flex flex-row justify-content-end gap-4 mb-4'>
            <button
              className='btn btn-primary px-4 py-2'
              style={{
                background: 'transparent',
                color: '#004E72',
                borderColor: '#004E72',
                borderRadius: '0.6rem',
              }}
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
            >
              Delete
            </button>
          </div>
        </div>
        <div className='d-flex flex-column gap-2'>
          <h5>Comments</h5>
          <div className='d-flex flex-column gap-4'>
            <div>
              <div className='d-flex gap-3 mb-3'>
                <span className='me-5'>Maisam</span>
                <span>17.01.2026</span>
                <span>17:30</span>
              </div>
              <p>
                Im looking for a distribution that works best with Steam and Nvidia drivers. Any
                suggestions?
              </p>
            </div>
            <div>
              <div className='d-flex gap-3 mb-3'>
                <span className='me-5'>Adis</span>
                <span>17.01.2026</span>
                <span>17:30</span>
              </div>
              <p>You should try Ubuntu!</p>
            </div>
            <div>
              <div className='d-flex gap-3 mb-3'>
                <span className='me-5'>Maisam</span>
                <span>17.01.2026</span>
                <span>17:30</span>
              </div>
              <p>
                Im looking for a distribution that works best with Steam and Nvidia drivers. Any
                suggestions?
              </p>
            </div>
            <div>
              <div className='d-flex gap-3 mb-3'>
                <span className='me-5'>Adis</span>
                <span>17.01.2026</span>
                <span>17:30</span>
              </div>
              <p>You should try Ubuntu!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Postpage;
