import React, { useState, useEffect } from "react";
import { Calendar, User } from "lucide-react";
import NAVBAR from "../SharedComponents/NavbarComponent.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../SharedComponents/authContext.jsx";

function Forumpage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3100/forum/posts", {
        credentials: "include",
      });
      const data = await response.json();
      
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    if (!user) {
      navigate("/auth");
    } else {
      navigate("/post");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading forum...</div>
      </div>
    );
  }

  return (
    <>
      <NAVBAR />

      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-lg-8'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
              <h1 className='mb-4 fw-bold'>Forum</h1>
              <div className='d-flex gap-2'>
                <button
                  className='secondaryButton px-4 py-2'
                  style={{ borderRadius: '0.6rem' }}
                  onClick={() => navigate('/')}
                >
                  Back
                </button>

                <button
                  className='secondaryButton px-4 py-2'
                  style={{ borderRadius: '0.6rem' }}
                  onClick={handleCreatePost}
                >
                  Create Post
                </button>
              </div>
            </div>

            {posts.length === 0 ? (
              <div className='card text-center p-4 text-muted'>
                No posts yet. Be the first to create one!
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className='card mb-4 shadow-sm'>
                  <div className='card-body'>
                    <h5 className='card-title fw-semibold mb-2'>{post.title}</h5>

                    <div className='d-flex gap-3 text-muted small mb-3'>
                      <div className='d-flex align-items-center gap-1'>
                        <User size={14} />
                        <span>{post.author || 'Deleted User'}</span>
                      </div>
                      <div className='d-flex align-items-center gap-1'>
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    <p className='card-text' style={{ whiteSpace: 'pre-wrap' }}>
                      {post.content}
                    </p>

                    <button
                      onClick={() => navigate('/post/' + post.id)}
                      className='secondaryButton px-3 py-1'
                      style={{
                        borderRadius: '0.6rem',
                      }}
                    >
                      Check Comments
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Forumpage;