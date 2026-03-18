import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const demo = { username: 'admin', password: 'admin123' }

  const onSubmit = (ev) => {
    ev.preventDefault()
    setError('')

    if (form.username === 'admin' && form.password === 'admin123') {
      localStorage.setItem('isAdmin', 'true')
      const next = location.state?.from || '/admin'
      navigate(next, { replace: true })
      return
    }

    setError('Invalid username or password')
  }

  return (
    <section className="auth">
      <div className="auth-card">
        <div className="auth-icon" aria-hidden="true">
          <i className="fa-solid fa-tooth" />
        </div>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="muted">Sign in to the admin dashboard</p>

        <form className="form auth-form" onSubmit={onSubmit}>
          <label>
            Email
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="admin@dentbook.com"
              autoComplete="username"
            />
          </label>

          <label>
            Password
            <div className="input-with-icon">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                autoComplete="current-password"
              />
              <button
                className="icon-button"
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'} aria-hidden="true" />
              </button>
            </div>
          </label>

          {error && <p className="error">{error}</p>}

          <button className="button button-wide" type="submit">
            Sign In
          </button>
        </form>
      </div>

      <div className="auth-hint">
        <div className="hint-title">
          <i className="fa-solid fa-circle-info fact-icon" aria-hidden="true" />
          Demo Credentials
        </div>
        <div className="hint-body">
          <div className="hint-row">
            <span className="muted">Email:</span> <code>admin</code>
          </div>
          <div className="hint-row">
            <span className="muted">Password:</span> <code>admin123</code>
          </div>
          <button className="button button-ghost" type="button" onClick={() => setForm(demo)}>
            Auto-fill credentials
          </button>
        </div>
      </div>
    </section>
  )
}
