import React, { useState, useEffect } from "react";
import { MessageCircle, Calendar, User } from "lucide-react";
import NAVBAR from "../SharedComponents/NavbarComponent.jsx";
import { useNavigate } from "react-router-dom";

function Forumpage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPosts, setExpandedPosts] = useState(new Set());
    const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3100/forum/posts", {
        credentials: "include",
      });
      const data = await response.json();

      const postsWithComments = await Promise.all(
        data.map(async (post) => {
          const commentsResponse = await fetch(
            `http://localhost:3100/forum/posts/${post.id}/comments`,
            { credentials: "include" },
          );
          const comments = await commentsResponse.json();
          return { ...post, comments };
        }),
      );

      setPosts(postsWithComments);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleComments = (postId) => {
    setExpandedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
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

      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h1 className="mb-4 fw-bold">Forum</h1>

            {posts.length === 0 ? (
              <div className="card text-center p-4 text-muted">
                No posts yet. Be the first to create one!
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="card mb-4 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold mb-2">
                      {post.title}
                    </h5>

                    <div className="d-flex gap-3 text-muted small mb-3">
                      <div className="d-flex align-items-center gap-1">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <div className="d-flex align-items-center gap-1">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>
                      {post.content}
                    </p>

                    <button
                      onClick={() => navigate("/post/" + post.id)}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <MessageCircle size={16} className="me-1" />
                      {post.comments.length}{" "}
                      {post.comments.length === 1 ? "Comment" : "Comments"}
                    </button>
                  </div>

                  {expandedPosts.has(post.id) && post.comments.length > 0 && (
                    <div className="border-top bg-light p-3">
                      {post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-white border rounded p-3 mb-2"
                        >
                          <div className="d-flex align-items-center gap-2 text-muted small mb-1">
                            <User size={12} />
                            <strong className="text-dark">
                              {comment.author.username}
                            </strong>
                            <span>•</span>
                            <span>
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </span>
                            {comment.edited_at && (
                              <>
                                <span>•</span>
                                <em>edited</em>
                              </>
                            )}
                          </div>

                          <p
                            className="mb-0"
                            style={{ whiteSpace: "pre-wrap" }}
                          >
                            {comment.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
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
