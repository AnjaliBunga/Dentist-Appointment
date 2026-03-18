import React from 'react'

export default function HomePage({ onBrowse, onAdmin }) {
  return (
    <section className="hero-panel">
      <h1>Dental care, simplified.</h1>
      <p className="lead">
        Browse dentists, book appointments, and manage your clinic (admin).
      </p>
      <div className="hero-actions">
        <button className="button" onClick={onBrowse}>
          Browse dentists
        </button>
        <button className="button button-ghost" onClick={onAdmin}>
          Admin login
        </button>
      </div>
    </section>
  )
}
