// app/staff-login/donations/page.tsx
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
    <div style={{ 
      padding: '40px', 
      maxWidth: '1400px', 
      margin: '0 auto',
      minHeight: 'calc(100vh - 200px)'
    }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937', margin: '0 0 8px 0' }}>
          Donations
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Track and manage all donations
        </p>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{ fontSize: '24px', color: '#374151', marginBottom: '16px' }}>
          Donations Management
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '30px' }}>
          View, filter, and analyze all donations received.
        </p>
        
        {/* Mock table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>Date</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>Donor</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>Amount</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>Campaign</th>
                <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '2024-12-15', donor: 'John Smith', amount: '$500', campaign: 'Annual Fund', status: 'Processed' },
                { date: '2024-12-14', donor: 'Sarah Johnson', amount: '$250', campaign: 'Holiday Drive', status: 'Processed' },
                { date: '2024-12-13', donor: 'Robert Brown', amount: '$1,000', campaign: 'Capital Campaign', status: 'Pending' },
                { date: '2024-12-12', donor: 'Emily Davis', amount: '$150', campaign: 'Monthly Giving', status: 'Processed' },
                { date: '2024-12-11', donor: 'Michael Wilson', amount: '$75', campaign: 'Annual Fund', status: 'Processed' },
              ].map((donation, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', color: '#374151' }}>{donation.date}</td>
                  <td style={{ padding: '12px', color: '#374151' }}>{donation.donor}</td>
                  <td style={{ padding: '12px', color: '#374151', fontWeight: '600' }}>{donation.amount}</td>
                  <td style={{ padding: '12px', color: '#374151' }}>{donation.campaign}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: donation.status === 'Processed' ? '#d1fae5' : '#fef3c7',
                      color: donation.status === 'Processed' ? '#065f46' : '#92400e'
                    }}>
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <button style={{ 
            padding: '12px 24px', 
            background: '#10b981', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            fontWeight: '500',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            Record New Donation
          </button>
        </div>
      </div>
    </div>
  )
}