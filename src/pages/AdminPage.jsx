import { useEffect, useState } from 'react'
import AdminPanel from '../components/AdminPanel.jsx'
import { API_BASE } from '../api.js'

const EMPTY_DENTIST = {
  name: '',
  photo: '',
  qualification: '',
  experience: '',
  clinicName: '',
  address: '',
  location: '',
}

export default function AdminPage({ onLogout }) {
  const [appointments, setAppointments] = useState([])
  const [appointmentsLoading, setAppointmentsLoading] = useState(false)
  const [appointmentsError, setAppointmentsError] = useState('')

  const [dentists, setDentists] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [newDentist, setNewDentist] = useState(EMPTY_DENTIST)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)

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

  const loadAppointments = async () => {
    setAppointmentsError('')
    setAppointmentsLoading(true)
    try {
      const res = await fetch(`${API_BASE}/appointments`)
      if (!res.ok) throw new Error('Could not load appointments')
      setAppointments(await res.json())
    } catch (err) {
      setAppointmentsError(err.message)
    } finally {
      setAppointmentsLoading(false)
    }
  }

  useEffect(() => {
    loadDentists()
    loadAppointments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createDentist = async (payload) => {
    const res = await fetch(`${API_BASE}/dentists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json()
    if (!res.ok) throw new Error(json?.message || 'Failed to create dentist')
    await loadDentists()
    return json
  }

  const deleteDentist = async (id) => {
    const res = await fetch(`${API_BASE}/dentists/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete dentist')
    await loadDentists()
  }

  const onCreate = async (ev) => {
    ev.preventDefault()
    setToast(null)

    const missing = Object.entries(newDentist).filter(([, v]) => !String(v).trim())
    if (missing.length) {
      setToast({ type: 'error', message: 'All dentist fields are required' })
      return
    }

    setSaving(true)
    try {
      await createDentist({ ...newDentist, experience: Number(newDentist.experience) })
      setToast({ type: 'success', message: 'Dentist added' })
      setNewDentist(EMPTY_DENTIST)
    } catch (err) {
      setToast({ type: 'error', message: err.message })
    } finally {
      setSaving(false)
    }
  }

  const onDelete = async (id) => {
    setToast(null)
    try {
      await deleteDentist(id)
      setToast({ type: 'success', message: 'Dentist deleted' })
    } catch (err) {
      setToast({ type: 'error', message: err.message })
    }
  }

  return (
    <AdminPanel
      appointments={appointments}
      appointmentsLoading={appointmentsLoading}
      appointmentsError={appointmentsError}
      onRefreshAppointments={loadAppointments}
      dentists={dentists}
      loading={loading}
      error={error}
      newDentist={newDentist}
      saving={saving}
      toast={toast}
      onCreate={onCreate}
      onDelete={onDelete}
      onChange={setNewDentist}
      onLogout={onLogout}
    />
  )
}

