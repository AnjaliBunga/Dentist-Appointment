import React from 'react'

export default function AdminPanel({
  appointments,
  appointmentsLoading,
  appointmentsError,
  onRefreshAppointments,
  dentists,
  loading,
  error,
  newDentist,
  saving,
  toast,
  onCreate,
  onDelete,
  onChange,
  onLogout,
}) {
  return (
    <section className="panel">
      <header className="panel-header">
        <div>
          <h2>Admin Panel</h2>
          <p className="muted">Manage all appointments</p>
        </div>
        <button className="button button-ghost" onClick={onLogout}>
          Sign Out
        </button>
      </header>

      <div className="panel-card">
        <div className="table-head">
          <h3 className="table-title">Appointments</h3>
          <button className="button button-ghost" type="button" onClick={onRefreshAppointments}>
            Refresh
          </button>
        </div>

        {appointmentsLoading ? (
          <p>Loading appointments…</p>
        ) : appointmentsError ? (
          <p className="error">{appointmentsError}</p>
        ) : !appointments?.length ? (
          <p className="muted">No appointments yet.</p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Appointment Date</th>
                  <th>Dentist</th>
                  <th>Clinic</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a._id}>
                    <td>{a.patientName}</td>
                    <td>{a.age}</td>
                    <td>{a.gender}</td>
                    <td>{new Date(a.appointmentDate).toLocaleDateString()}</td>
                    <td>{a?.dentist?.name || '—'}</td>
                    <td>{a?.dentist?.clinicName || '—'}</td>
                    <td>
                      <span className="pill">Booked</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <details className="panel-card panel-card-muted">
        <summary className="details-summary">Dentist management</summary>

        <div className="panel-grid">
          <div className="panel-card-inner">
            <h3>Add a dentist</h3>
            <form className="form" onSubmit={onCreate}>
              <div className="form-row">
                <label>
                  Name
                  <input
                    value={newDentist.name}
                    onChange={(e) => onChange({ ...newDentist, name: e.target.value })}
                    placeholder="Full name"
                  />
                </label>
                <label>
                  Photo URL
                  <input
                    value={newDentist.photo}
                    onChange={(e) => onChange({ ...newDentist, photo: e.target.value })}
                    placeholder="https://..."
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Qualification
                  <input
                    value={newDentist.qualification}
                    onChange={(e) => onChange({ ...newDentist, qualification: e.target.value })}
                    placeholder="BDS, DDS, etc."
                  />
                </label>
                <label>
                  Experience (years)
                  <input
                    type="number"
                    min="0"
                    value={newDentist.experience}
                    onChange={(e) => onChange({ ...newDentist, experience: e.target.value })}
                    placeholder="e.g. 8"
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Clinic name
                  <input
                    value={newDentist.clinicName}
                    onChange={(e) => onChange({ ...newDentist, clinicName: e.target.value })}
                    placeholder="My Dental Care"
                  />
                </label>
                <label>
                  Address
                  <input
                    value={newDentist.address}
                    onChange={(e) => onChange({ ...newDentist, address: e.target.value })}
                    placeholder="123 Main St"
                  />
                </label>
              </div>
              <label>
                Location (city/state)
                <input
                  value={newDentist.location}
                  onChange={(e) => onChange({ ...newDentist, location: e.target.value })}
                  placeholder="Seattle, WA"
                />
              </label>

              {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}

              <button className="button" disabled={saving} type="submit">
                {saving ? 'Saving…' : 'Add dentist'}
              </button>
            </form>
          </div>

          <div className="panel-card-inner">
            <h3>Existing dentists</h3>
            {loading ? (
              <p>Loading dentists…</p>
            ) : error ? (
              <p className="error">{error}</p>
            ) : dentists.length === 0 ? (
              <p className="muted">No dentists found. Add one above.</p>
            ) : (
              <ul className="dentist-list">
                {dentists.map((dentist) => (
                  <li key={dentist._id} className="dentist-item">
                    <div>
                      <strong>{dentist.name}</strong>
                      <p className="small">
                        {dentist.clinicName} · {dentist.location}
                      </p>
                    </div>
                    <button className="button button-ghost" onClick={() => onDelete(dentist._id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </details>
    </section>
  )
}
