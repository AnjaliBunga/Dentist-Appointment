import React from 'react'

export default function BookAppointment({
  dentist,
  form,
  status,
  onChange,
  onSubmit,
  onClose,
}) {
  if (!dentist) return null

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close" onClick={onClose}>
          ×
        </button>
        <h3>Book with {dentist.name}</h3>
        <form className="form" onSubmit={onSubmit}>
          <label>
            Patient name
            <input
              value={form.patientName}
              onChange={(e) => onChange({ ...form, patientName: e.target.value })}
            />
          </label>
          <label>
            Age
            <input
              type="number"
              min="1"
              value={form.age}
              onChange={(e) => onChange({ ...form, age: e.target.value })}
            />
          </label>
          <label>
            Gender
            <select
              value={form.gender}
              onChange={(e) => onChange({ ...form, gender: e.target.value })}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Appointment date
            <input
              type="datetime-local"
              value={form.appointmentDate}
              onChange={(e) => onChange({ ...form, appointmentDate: e.target.value })}
            />
          </label>

          {status && <p className={`toast ${status.type}`}>{status.message}</p>}

          <div className="modal-actions">
            <button className="button button-ghost" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
