import { useState } from 'react'
import { API_BASE } from '../api'

const DEFAULT_FORM = {
  patientName: '',
  age: '',
  gender: 'Male',
  appointmentDate: '',
}

export function useBooking() {
  const [dentist, setDentist] = useState(null)
  const [form, setForm] = useState(DEFAULT_FORM)
  const [status, setStatus] = useState(null)

  const openBooking = (dentist) => {
    setDentist(dentist)
    setForm(DEFAULT_FORM)
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
          dentist: dentist._id,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.message || 'Failed to book appointment')

      setStatus({ type: 'success', message: 'Appointment booked!' })
      setForm(DEFAULT_FORM)
      return json
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    }
  }

  return {
    dentist,
    form,
    status,
    setForm,
    openBooking,
    closeBooking,
    submitBooking,
  }
}
