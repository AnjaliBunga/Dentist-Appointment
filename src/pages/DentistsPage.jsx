import { useEffect, useMemo, useState } from 'react'
import DentistList from '../components/DentistList.jsx'
import BookAppointment from '../components/BookAppointment.jsx'
import { API_BASE } from '../api.js'

const EMPTY_BOOKING = { patientName: '', age: '', gender: 'Male', appointmentDate: '' }

export default function DentistsPage() {
  const [query, setQuery] = useState('')
  const [dentists, setDentists] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [dentist, setDentist] = useState(null)
  const [form, setForm] = useState(EMPTY_BOOKING)
  const [status, setStatus] = useState(null)

  const loadDentists = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/dentists`)
      if (!res.ok) throw new Error('Could not load dentists')
      setDentists(await res.json())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDentists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredDentists = useMemo(() => {
    const q = String(query || '').toLowerCase().trim()
    if (!q) return dentists
    return dentists.filter((d) => {
      const hay = [d.name, d.clinicName, d.location, d.qualification, d.address]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    })
  }, [dentists, query])

  const openBooking = (d) => {
    setDentist(d)
    setForm(EMPTY_BOOKING)
    setStatus(null)
  }

  const closeBooking = () => {
    setDentist(null)
    setStatus(null)
  }

  const submitBooking = async (ev) => {
    ev.preventDefault()
    setStatus(null)

    const { patientName, age, gender, appointmentDate } = form
    if (!patientName || !age || !gender || !appointmentDate) {
      setStatus({ type: 'error', message: 'All fields are required' })
      return
    }

    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName,
          age: Number(age),
          gender,
          appointmentDate,
          dentist: dentist?._id,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.message || 'Failed to book appointment')

      setStatus({ type: 'success', message: 'Appointment booked!' })
      setForm(EMPTY_BOOKING)
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    }
  }

  return (
    <section className="panel">
      <header className="hero">
        <div className="hero-inner">
          <div className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            Trusted by thousands of patients
          </div>
          <h1 className="hero-title">
            Find Your Perfect <span className="accent">Dentist</span>
          </h1>
          <p className="hero-subtitle">
            Book appointments with top dental professionals in your area. Quality care, just a click away.
          </p>

          <div className="search">
            <i className="fa-solid fa-magnifying-glass search-icon" aria-hidden="true" />
            <input
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, clinic, or location…"
            />
          </div>
        </div>
      </header>

      <div className="panel-header panel-header-compact">
        <p className="muted">{loading ? 'Loading dentists…' : `Showing ${filteredDentists.length} dentists`}</p>
      </div>

      {loading ? (
        <p>Loading dentists…</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : filteredDentists.length === 0 ? (
        <p className="muted">No dentists match your search.</p>
      ) : (
        <DentistList dentists={filteredDentists} onBook={openBooking} />
      )}

      <BookAppointment
        dentist={dentist}
        form={form}
        status={status}
        onChange={setForm}
        onSubmit={submitBooking}
        onClose={closeBooking}
      />
    </section>
  )
}

