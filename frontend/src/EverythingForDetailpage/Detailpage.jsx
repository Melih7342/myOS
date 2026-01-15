import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import NAVBAR from '../SharedComponents/NavbarComponent.jsx';

function Detailpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [distro, setDistro] = useState(location.state?.distro || null);
  const [loading, setLoading] = useState(!distro);

  useEffect(() => {
    if (!distro) {
      fetch(`http://localhost:3100/distros/${id}`)
        .then(res => res.json())
        .then(data => {
          setDistro(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Fetch error:", err);
          setLoading(false);
        });
    }
  }, [id, distro]);

  const getEmbedId = (link) => {
    if (!link) return null;
    if (link.includes("v=")) return link.split("v=")[1].split("&")[0];
    if (link.includes("be/")) return link.split("be/")[1];
    return link;
  };

  if (loading) {
    return (
      <>
        <NAVBAR />
        <div className="container" style={{ marginTop: '8rem', textAlign: 'center' }}>
          <div className="spinner-border text-primary" role="status"></div>
          <p>Loading Operating System...</p>
        </div>
      </>
    );
  }

  if (!distro) {
    return (
      <>
        <NAVBAR />
        <div className="container mt-5">
          <div className="alert alert-warning">Distro not found.</div>
          <button className="btn btn-primary" onClick={() => navigate('/katalog')}>Back to Catalog</button>
        </div>
      </>
    );
  }

  return (
    <>
      <NAVBAR />

      <div className='container' style={{ color: '#004E72', marginTop: '8rem' }}>
        <div className='row justify-content-between gap-5 pb-5'>
          <div className='col'>
            <h3 className='pb-4'>
              <b>{distro.name}</b>
            </h3>
            <div className='row gap-3 pb-3' style={{ fontSize: '13pt' }}>
              <p className='col'>
                OS type: <b>{distro.os_type || 'N/A'}</b>
              </p>
              <p className='col'>
                category: <b>{distro.category || 'N/A'}</b>
              </p>
            </div>
            <p style={{ fontSize: '10pt' }}>{distro.description || 'No description available'}</p>
            <div className='d-flex gap-5 pb-3'>
              <span>based on: {distro.based_on || 'N/A'}</span>
              <span>desktop: {distro.desktop || 'N/A'}</span>
            </div>
            <div className='d-flex gap-5 pb-3'>
              <span>price: {distro.price || 'Free'}</span>
              <span>beginner friendly: {distro.beginner_friendly ? 'Yes' : 'No'}</span>
            </div>
          </div>

          <div className='col d-flex justify-content-center align-items-center'>
            <div style={{
              width: '15rem',
              height: '15rem',
              backgroundColor: '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px'
            }}>
              <span style={{ color: '#888' }}>Image placeholder</span>
            </div>
          </div>
        </div>

        <div className='row justify-content-between gap-5 pb-5'>
          <div className='col'>
            <p>How to Install the OS?</p>
            <div className='text-center'>
              {distro.youtube_link ? (
                <iframe
                  width='560'
                  height='315'
                  src={`https://www.youtube.com/embed/${getEmbedId(distro.youtube_link)}`}
                  title='YouTube video player'
                  frameBorder="0"
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              ) : (
                <p className='text-muted'>No installation video available</p>
              )}
            </div>
          </div>
        </div>

        <button className="btn btn-primary mb-5" onClick={() => navigate('/katalog')}>
          Back to Catalog
        </button>
      </div>
    </>
  );
}

export default Detailpage;