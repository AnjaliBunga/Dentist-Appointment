import { useCallback, useEffect, useState } from 'react'
import { API_BASE } from '../api'

export function useDentists({ autoLoad = true } = {}) {
  const [dentists, setDentists] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadDentists = useCallback(async () => {
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/dentists`)
      if (!res.ok) throw new Error('Could not load dentists')
      const data = await res.json()
      setDentists(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const createDentist = useCallback(
    async (dentist) => {
      const res = await fetch(`${API_BASE}/dentists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dentist),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json?.message || 'Failed to create dentist')

      loadDentists()
      return json
    },
    [loadDentists],
  )

  const deleteDentist = useCallback(
    async (id) => {
      const res = await fetch(`${API_BASE}/dentists/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete dentist')
      loadDentists()
    },
    [loadDentists],
  )

  useEffect(() => {
    if (autoLoad) loadDentists()
  }, [autoLoad, loadDentists])

  return {
    dentists,
    loading,
    error,
    loadDentists,
    createDentist,
    deleteDentist,
  }
}
