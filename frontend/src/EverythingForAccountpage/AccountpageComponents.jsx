import React from "react";
import { useNavigate } from "react-router-dom";

export function AccountHeader({ username, favoriteOS, favoriteId, onRemove }) {
  const navigate = useNavigate();

  return (
    <>
      <h2 className="mb-4">{username}</h2>
      
      <p className="mb-2"> My favorite OS is:</p>

      {favoriteOS ? (
        <div className="d-flex flex-row align-items-center gap-2 mb-5">
          
          <button
            onClick={() => navigate(`/detail/${favoriteId}`)}
            className="btn btn-sm"
            style={{
              background: "#e6b400",
              color: "#ffffff",
              
              borderRadius: "0.5rem",
              fontSize: "1.2rem",
              padding: "0.3rem 0.8rem",
              fontWeight: "800"
            }}
          >

            {favoriteOS}
          </button>

          <button
            onClick={onRemove}
            className="btn btn-sm"
            style={{
              background: "transparent",
              color: "#FF2132",
              borderColor: "#FF2132",
              borderRadius: "0.5rem",
              fontSize: "0.8rem",
              padding: "0.3rem 0.8rem",
            }}
          >
            Remove
          </button>
        </div>
      ) : (
        <p className="mb-5">
          <b>not set yet</b>
        </p>
      )}
    </>
  );
}

export function AccountButtons({ logout, deleteAccount }) {
  return (
    <>
      <div className="d-flex flex-row gap-4 mb-4">

        <button
          onClick={logout}
          className="btn btn-primary px-4 py-2"
          style={{
            background: "transparent",
            color: "#004E72",
            borderColor: "#004E72",
            borderRadius: "0.6rem",
          }}
        >
          Log out
        </button>

        <button
          onClick={deleteAccount}
          className="btn btn-primary px-4 py-2"
          style={{
            background: "transparent",
            color: "#FF2132",
            borderColor: "#FF2132",
            borderRadius: "0.6rem",
          }}
        >
          Delete Account
        </button>
      </div>
    </>
  );
}

export function ForumPart({}) {
  return (
    <>
      <div>
        <h3>My Forums</h3>
        <p>Here come the forums!</p>
      </div>
    </>
  );
}
