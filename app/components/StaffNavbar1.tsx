// app/components/StaffNavbar.tsx
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import './StaffNavbar2.css'

export default function StaffNavbar() {
  const [user, setUser] = useState<any>(null)
  const [isStaffPage, setIsStaffPage] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Check if current path is a staff page
    const isStaffPath = pathname.startsWith('/staff-login') && pathname !== '/staff-login'
    setIsStaffPage(isStaffPath)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/staff-login')
  }

  // Only show staff navbar on staff pages AND when user is logged in
  if (!isStaffPage || !user) {
    return null
  }

  return (
    <nav className="staff-navbar">
      <div className="staff-navbar-container">
        {/* Left side: Logo and Navigation */}
        <div className="staff-navbar-left">
          <Link href="/staff-login/dashboard/" className="staff-navbar-logo">
            donor<span className="staff-logo-accent">Connect</span>
            <span className="staff-badge">Staff</span>
          </Link>
          
          <div className="staff-nav-links">
            <Link 
              href="/staff-login/dashboard/" 
              className={`staff-nav-link ${pathname === '/staff-login/dashboard/' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/staff-login/donors/" 
              className={`staff-nav-link ${pathname.startsWith('/staff-login/donors') ? 'active' : ''}`}
            >
              Donors
            </Link>
            <Link 
              href="/staff-login/donations/" 
              className={`staff-nav-link ${pathname.startsWith('/staff-login/donations') ? 'active' : ''}`}
            >
              Donations
            </Link>
            <Link 
              href="/staff-login/campaigns/" 
              className={`staff-nav-link ${pathname.startsWith('/staff-login/campaigns') ? 'active' : ''}`}
            >
              Campaigns
            </Link>
            <Link 
              href="/staff-login/tasks/" 
              className={`staff-nav-link ${pathname.startsWith('/staff-login/tasks') ? 'active' : ''}`}
            >
              Tasks
            </Link>
          </div>
        </div>

        {/* Right side: User info and logout */}
        <div className="staff-navbar-right">
          <div className="staff-user-info">
            <div className="user-avatar">
              {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
            </div>
            <div className="user-details">
              <span className="user-name">{user.name || user.email}</span>
              <span className="user-role">{user.role || 'Staff'}</span>
            </div>
            <button onClick={handleLogout} className="staff-logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}