import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import NAVBAR from '../SharedComponents/NavbarComponent.jsx';
import { useAuth } from "../SharedComponents/authContext";

function Detailpage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { user, refreshAuth } = useAuth();

  const [distro, setDistro] = useState(location.state?.distro || null);
  const [loading, setLoading] = useState(!distro);

  // Logo-Logik (exakt wie in der Results-Komponente)
  const identifier = distro?.logo_name || distro?.name?.toLowerCase().replace(/\s/g, "");
  const logoUrl = `https://distrowatch.com/images/yvzhuwbpy/${identifier}.png`;

  const isFavorite = (user && distro?.id)
  ? Number(user.favorite_distro_id) === Number(distro.id)
  : false;

  const handleToggleFavorite = async () => {
    if (!user) {
        alert("Please log in first to set a favorite OS.");
        return;
    }
    try {
      const response = await fetch("http://localhost:3100/api/user/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ distro_id: distro.id }),
      });
      if (response.ok) { await refreshAuth(); }
    } catch (err) { console.error("Toggle Favorite Error:", err); }
  };

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
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = link.match(regExp);
    return (match && match[2].length === 11) ? match[2] : link;
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

  return (
    <>
      <NAVBAR />
      <div className='container' style={{ color: '#004E72', marginTop: '8rem' }}>
        <div className='row justify-content-between gap-5 pb-5'>
          <div className='col-md-7'>
            <h3 className='pb-4'>
              <b>{distro.name}</b>
              <button
                onClick={handleToggleFavorite}
                className={`btn ms-3 ${isFavorite ? 'btn-warning fw-bold' : 'btn-outline-warning'}`}
                style={{ borderRadius: '0.8rem', transition: '0.3s' }}
              >
                {isFavorite ? "⭐ Favored" : "☆ Set as Favorite"}
              </button>
            </h3>

            <div className='row gap-3 pb-3' style={{ fontSize: '13pt' }}>
              <p className='col'>OS type: <b>{distro.os_type || 'N/A'}</b></p>
              <p className='col'>Category: <b>{distro.category || 'N/A'}</b></p>
            </div>

            <p style={{ fontSize: '10pt' }}>{distro.description || 'No description available'}</p>

            <div className='d-flex gap-5 pb-3'>
              <span>Based on: {distro.based_on || 'N/A'}</span>
              <span>Desktop: {distro.desktop || 'N/A'}</span>
            </div>
            <div className='d-flex gap-5 pb-3'>
              <span>Price: {distro.price || 'Free'}</span>
              <span>Beginner friendly: {distro.beginner_friendly ? 'Yes' : 'No'}</span>
            </div>
          </div>

          <div className='col-md-4 d-flex justify-content-center align-items-center'>
            <div style={{
              width: '15rem',
              height: '15rem',
              backgroundColor: '#f8f9fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '1rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <img
                src={logoUrl}
                alt={`${distro.name} logo`}
                referrerPolicy="no-referrer"
                style={{
                  maxWidth: "80%",
                  maxHeight: "80%",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150?text=OS+Logo";
                }}
              />
            </div>
          </div>
        </div>

        <div className='row justify-content-center gap-5 pb-5'>
          <div className='col-12 text-center'>
            <h4 className="mb-4">How to Install {distro.name}?</h4>
            <div className='ratio ratio-16x9 mx-auto' style={{ maxWidth: '800px' }}>
              {distro.youtube_link || distro.install_video ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getEmbedId(distro.youtube_link || distro.install_video)}`}
                  title='YouTube video player'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                  style={{ borderRadius: '1rem', border: 'none' }}
                ></iframe>
              ) : (
                <div className="bg-light d-flex align-items-center justify-content-center rounded-4">
                  <p className='text-muted'>No installation video available</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <button className="btn btn-primary mb-5 px-4" onClick={() => navigate('/catalog')}>
          ← Back to Catalog
        </button>
      </div>
    </>
  );
}

export default Detailpage;