import './App.css'

import AdminLogin from './pages/AdminLogin.jsx'
import AdminPage from './pages/AdminPage.jsx'
import DentistsPage from './pages/DentistsPage.jsx'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

function RequireAdmin({ isAdmin, children }) {
  const location = useLocation()
  if (!isAdmin) return <Navigate to="/admin-login" replace state={{ from: location.pathname }} />
  return children
}

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const isAdmin = localStorage.getItem('isAdmin') === 'true'
  const activeNavClass = (path) => (location.pathname === path ? 'nav-item active' : 'nav-item')

  const logout = () => {
    localStorage.removeItem('isAdmin')
    navigate('/dentists', { replace: true })
  }

  return (
    <div className="app">
      <header className="nav">
        <div className="nav-logo" onClick={() => navigate('/dentists')} role="button" tabIndex={0}>
          <span className="brand-mark" aria-hidden="true">
            <i className="fa-solid fa-tooth" />
          </span>
          <span className="brand-name">DentBook</span>
        </div>
        <nav className="nav-items">
          <button className={activeNavClass('/dentists')} onClick={() => navigate('/dentists')}>
            Dentists
          </button>
          {isAdmin ? (
            <button className={activeNavClass('/admin')} onClick={() => navigate('/admin')}>
              Admin Panel
            </button>
          ) : (
            <button className={activeNavClass('/admin-login')} onClick={() => navigate('/admin-login')}>
              Admin Login
            </button>
          )}
        </nav>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/dentists" replace />} />
          <Route path="/dentists" element={<DentistsPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin isAdmin={isAdmin}>
                <AdminPage onLogout={logout} />
              </RequireAdmin>
            }
          />
          <Route
            path="*"
            element={
              <section className="panel">
                <p className="muted">Page not found.</p>
              </section>
            }
          />
        </Routes>
      </main>

      <footer className="footer">
        <p>
          Built with React + Vite · Admin: <code>admin</code> / <code>admin123</code>
        </p>
      </footer>
    </div>
  )
}
