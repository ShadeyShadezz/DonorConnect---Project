// app/staff/donations/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DonationsPage() {
  const [user, setUser] = useState<any>(null)
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
  }, [router])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Donations</h1>
      <p>Track and manage all donations</p>
      <div style={{ 
        background: '#f8f9fa', 
        padding: '40px', 
        borderRadius: '12px', 
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <h3>Donations Management</h3>
        <p>This page will show all donations, with filtering and search capabilities.</p>
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
          <button style={{ padding: '10px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '6px' }}>
            View All Donations
          </button>
          <button style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '6px' }}>
            Add New Donation
          </button>
        </div>
      </div>
    </div>
  )
}