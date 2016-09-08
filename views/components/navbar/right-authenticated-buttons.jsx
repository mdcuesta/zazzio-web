import React from 'react';

export default function RightAuthenticatedButtons() {
  return (
    <div
      className="title-bar-right"
      id="title-bar-right"
    >
      <a
        href="/logout"
        type="button"
        className="alert button link-button hollow"
      >
        Log out
      </a>
    </div>
  );
}

