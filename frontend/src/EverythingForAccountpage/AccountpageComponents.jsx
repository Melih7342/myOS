import React from "react";

export function AccountHeader({ username }) {
  return (
    <>
      <h2 className="mb-4">{username}</h2>
      <p>
        My favourite OS is <b>Ubuntu</b>.
      </p>
      <p style={{ marginBottom: "8rem" }}>
        My profession is <b>managing servers</b>.
      </p>
    </>
  );
}

export function AccountButtons({ logout, deleteAccount }) {
  return (
    <>
      <div className="d-flex flex-row gap-4 mb-4">
        <button
          className="btn btn-primary px-4 py-2"
          style={{
            background: "#004E72",
            color: "#FEFEFE",
            borderRadius: "0.6rem",
          }}
          disabled
        >
          Change Password
        </button>

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
