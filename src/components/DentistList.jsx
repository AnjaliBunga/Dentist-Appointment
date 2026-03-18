import React from 'react'

export default function DentistList({ dentists, onBook }) {
  return (
    <div className="cards">
      {dentists.map((dentist) => (
        <article key={dentist._id} className="dentist-card">
          <div className="dentist-photo">
            {dentist.photo ? (
              <img src={dentist.photo} alt={dentist.name} loading="lazy" />
            ) : (
              <div className="dentist-photo-fallback" aria-hidden="true" />
            )}
          </div>

          <div className="dentist-body">
            <div className="dentist-top">
              <div>
                <h3 className="dentist-name">{dentist.name}</h3>
                <p className="dentist-sub">
                  {dentist.qualification || 'Dentist'} {dentist.experience != null ? `· ${dentist.experience} years experience` : ''}
                </p>
              </div>
            </div>

            <ul className="dentist-facts">
              <li>
                <i className="fa-regular fa-hospital fact-icon" aria-hidden="true" />
                <span>{dentist.clinicName || 'Clinic'}</span>
              </li>
              <li>
                <i className="fa-solid fa-location-dot fact-icon" aria-hidden="true" />
                <span>{dentist.location || 'Location'}</span>
              </li>
              {dentist.address ? (
                <li>
                  <i className="fa-solid fa-map-pin fact-icon" aria-hidden="true" />
                  <span>{dentist.address}</span>
                </li>
              ) : null}
            </ul>

            <button className="button button-wide" onClick={() => onBook(dentist)}>
              Book Appointment
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
