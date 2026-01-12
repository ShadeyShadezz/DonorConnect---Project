'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import './staff-login.css'

export default function StaffLoginPage() {
  const [email, setEmail] = useState('admin@donorconnect.org')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/staff/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await res.json()
      
      if (res.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        // CORRECT PATH: Redirect to dashboard inside staff-login
        router.push('/staff-login/dashboard/')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err: any) {
      setError('Network error. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="staff-login-container">
      <div className="staff-login-card">
        <h1 className="staff-login-title">Staff Login</h1>
        <p className="staff-login-subtitle">Access donorConnect staff dashboard</p>

        <form onSubmit={handleSubmit} className="staff-login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="staff@donorconnect.org"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <div className="staff-login-error">{error}</div>}

          <button 
            type="submit" 
            className="staff-login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="staff-login-signup">
            <p>Don't have an account? <Link href="/sign-up">Sign up here</Link></p>
          </div>
        </form>

        <div className="test-credentials">
          <p><strong>Test Account:</strong></p>
          <p>Email: admin@donorconnect.org</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  )
}