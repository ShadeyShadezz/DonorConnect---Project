// app/staff/dashboard/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import './dashboard.css'

export default function StaffDashboard() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    totalDonors: 0,
    activeDonors: 0,
    lifetimeDonations: 0,
    monthlyDonations: 0,
    activeCampaigns: 0,
    totalDonations: 0
  })
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token) {
      router.push('/staff-login')
      return
    }
    
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // TODO: Fetch real stats from API
    fetchDashboardStats()
  }, [router])

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch('/api/staff/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/staff-login')
}

  if (!user) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Dashboard</h1>
          <p className="header-subtitle">Overview of your fundraising activities</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <span>Welcome, {user.name || user.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
        <nav className="dashboard-nav">
        <Link href="/staff-login/donors/" className="nav-link">
            <div className="nav-icon">👥</div>
            <span>Donors</span>
        </Link>
        <Link href="/staff-login/donations/" className="nav-link">
            <div className="nav-icon">💰</div>
            <span>Donations</span>
        </Link>
        <Link href="/staff-login/campaigns/" className="nav-link">
            <div className="nav-icon">🎯</div>
            <span>Campaigns</span>
        </Link>
        <Link href="/staff-login/tasks/" className="nav-link">
            <div className="nav-icon">✅</div>
            <span>Tasks</span>
        </Link>
        </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-header">
              <h3>Total Donors</h3>
              <span className="stat-badge">12 months</span>
            </div>
            <div className="stat-value">{stats.activeDonors} active</div>
            <div className="stat-total">{stats.totalDonors} total</div>
            <div className="stat-sub">{stats.totalDonations} donations</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>Lifetime Donations</h3>
            </div>
            <div className="stat-value">${stats.lifetimeDonations.toLocaleString()}</div>
            <div className="stat-sub">{stats.totalDonations} donations</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>This Month</h3>
            </div>
            <div className="stat-value">${stats.monthlyDonations.toLocaleString()}</div>
            <div className="stat-sub">{stats.totalDonations} donations</div>
          </div>

          <div className="stat-card">
            <div className="stat-header">
              <h3>Active Campaigns</h3>
            </div>
            <div className="stat-value">{stats.activeCampaigns}</div>
            <div className="stat-sub">Avg: ${stats.activeCampaigns > 0 ? (stats.lifetimeDonations / stats.activeCampaigns).toFixed(0) : 0}</div>
          </div>
        </div>

        {/* Charts/Additional Info */}
        <div className="dashboard-section">
          <div className="section-card">
            <h3>Donor Engagement</h3>
            <p>Key metrics for donor relationships</p>
            <div className="engagement-metrics">
              <div className="metric">
                <div className="metric-label">Active Donors</div>
                <div className="metric-value">{stats.activeDonors} / {stats.totalDonors}</div>
              </div>
            </div>
          </div>

          <div className="section-card">
            <h3>Monthly Performance</h3>
            <p>Current month vs. average</p>
            <div className="performance-metrics">
              <div className="metric">
                <div className="metric-label">This Month</div>
                <div className="metric-value">${stats.monthlyDonations}</div>
              </div>
              <div className="metric">
                <div className="metric-label">Donations Count</div>
                <div className="metric-value">{stats.totalDonations}</div>
              </div>
              <div className="metric">
                <div className="metric-label">Active Campaigns</div>
                <div className="metric-value">{stats.activeCampaigns}</div>
              </div>
            </div>
          </div>
        </div>

       {/* Quick Actions */}
        <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
            <button className="action-btn" onClick={() => router.push('/staff-login/donors/')}>
            <span>➕</span>
            Add New Donor
            </button>
            <button className="action-btn" onClick={() => router.push('/staff-login/donations/')}>
            <span>💰</span>
            Record Donation
            </button>
            <button className="action-btn" onClick={() => router.push('/staff-login/campaigns/')}>
            <span>🎯</span>
            Create Campaign
            </button>
        </div>
        </div>
        </main>   
        </div>
        )
        }

