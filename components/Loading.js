import React from 'react';

export default function Loading() {
  return (
    <div className="text-center mt-5">
      <div
        className="spinner-border"
        style={{
          color: 'rgb(233,105,57)',
          width: '100px',
          height: '100px',
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
