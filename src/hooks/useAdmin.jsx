import { useState } from 'react'

const DEFAULT_ADMIN = { username: 'admin', password: 'admin123' }

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true')
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const login = (ev) => {
    ev.preventDefault()
    setError('')

    if (form.username === DEFAULT_ADMIN.username && form.password === DEFAULT_ADMIN.password) {
      setIsAdmin(true)
      localStorage.setItem('isAdmin', 'true')
      setForm({ username: '', password: '' })
      return true
    }

    setError('Invalid username or password')
    return false
  }

  const logout = () => {
    setIsAdmin(false)
    localStorage.removeItem('isAdmin')
  }

  return {
    isAdmin,
    form,
    error,
    setForm,
    login,
    logout,
  }
}
