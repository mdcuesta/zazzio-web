import React from 'react';

export default function RightUnAuthenticatedButtons() {
  return (
    <div
      className="title-bar-right"
      id="title-bar-right"
    >
      <a
        href="/login"
        type="button"
        className="button link-button"
      >
        Log In
      </a>
      <a
        href="/sign-up"
        type="button"
        className="z-musturd button link-button hollow"
      >
        Sign Up
      </a>
    </div>
  );
}
