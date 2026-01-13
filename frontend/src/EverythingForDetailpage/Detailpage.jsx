import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NAVBAR from '../SharedComponents/NavbarComponent.jsx';
import ubuntuImage from './ubuntu.png';

function Detailpage() {
  const navigate = useNavigate();

  const os = {
    name: 'Ubuntu',
    url: 'https://distrowatch.com/ubuntu',
    OSType: 'Linux',
    BasedOn: 'Debian',
    Origin: 'Isle of Man',
    Architecture: 'armhf,ppc64el,riscv,s390x,x86_64',
    Desktop: 'GNOME,Unity',
    Category: 'Beginners,Desktop,Immutable,Server,Live Medium',
    Status: 'Active',
    Popularity: '9',
    description: 'Ubuntu is a complete desktop Linux operating system, freely available with both community and professional support. The Ubuntu community is built on the ideas enshrined in the Ubuntu Manifesto: that software should be available free of charge, that software tools should be usable by people in their local language and despite any disabilities, and that people should have the freedom to customise and alter their software in whatever way they see fit. "Ubuntu" is an ancient African word, meaning "humanity to others". The Ubuntu distribution brings the spirit of Ubuntu to the software world.',
    'Beginner-friendly': true,
    'Price (US$)': 'Free',
    'Image Size (MB)': '',
    Download: 'http://cdimage.ubuntu.com/daily-live/current/',
  };

  return (
    <>
      <NAVBAR />

      <div className='container' style={{ color: '#004E72', marginTop: '8rem' }}>
        <div className='row justify-content-between gap-5 pb-5'>
          <div className='col'>
            <h3 className='pb-4'>
              <b>{os.name}</b>
            </h3>
            <div className='row gap-3 pb-3' style={{ fontSize: '13pt' }}>
              <p className='col'>
                OS type: <b>{os.OSType}</b>
              </p>
              <p className='col'>
                origin: <b>{os.Origin}</b>
              </p>
              <p className='col'>
                category: <b>{os.Category}</b>
              </p>
            </div>
            <p style={{ fontSize: '10pt' }}>{os.description}</p>
            <div className='d-flex gap-5 pb-3'>
              <span>based on: {os.BasedOn}</span>
              <span>desktop: {os.Desktop}</span>
            </div>
          </div>
          <div className='col d-flex justify-content-center align-items-center'>
            <img src={ubuntuImage} alt={os.name} style={{ width: '15rem' }} />
          </div>
        </div>
        <div className='row justify-content-between gap-5 pb-5'>
          <div className='col'>
            <p>How to Install the OS?</p>
            <div className='text-center'>
              <iframe
                width='560'
                height='315'
                src='https://www.youtube.com/embed/VIDEO_ID'
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className='col'>
            <p>Security Tips</p>
            <div className='text-center'>
              <iframe
                width='560'
                height='315'
                src='https://www.youtube.com/embed/VIDEO_ID'
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detailpage;
