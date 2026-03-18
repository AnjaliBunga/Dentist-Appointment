import { useCallback, useEffect, useState } from 'react'
import { API_BASE } from '../api'

export function useAppointments({ autoLoad = true } = {}) {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadAppointments = useCallback(async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/appointments`)
      if (!res.ok) throw new Error('Could not load appointments')
      const data = await res.json()
      setAppointments(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (autoLoad) loadAppointments()
  }, [autoLoad, loadAppointments])

  return {
    appointments,
    loading,
    error,
    loadAppointments,
  }
}

