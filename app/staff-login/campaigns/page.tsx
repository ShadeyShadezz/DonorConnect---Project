// app/staff-login/campaigns/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CampaignsPage() {
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
          Campaigns
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Manage fundraising campaigns and appeals
        </p>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{ fontSize: '24px', color: '#374151', marginBottom: '24px' }}>
          Active Campaigns
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginBottom: '40px'
        }}>
          {[
            { name: 'Annual Fund 2024', goal: '$100,000', raised: '$78,500', progress: 78 },
            { name: 'Holiday Giving Drive', goal: '$50,000', raised: '$32,150', progress: 64 },
            { name: 'Capital Campaign', goal: '$500,000', raised: '$325,000', progress: 65 },
          ].map((campaign, index) => (
            <div key={index} style={{
              border: '1px solid #e5e7eb',
              borderRadius: '10px',
              padding: '24px',
              background: 'white'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>
                {campaign.name}
              </h3>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Progress</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                    {campaign.progress}%
                  </span>
                </div>
                <div style={{
                  height: '8px',
                  background: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${campaign.progress}%`,
                    height: '100%',
                    background: '#3b82f6',
                    borderRadius: '4px'
                  }}></div>
                </div>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '12px',
                marginTop: '20px'
              }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Raised</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#10b981' }}>
                    {campaign.raised}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Goal</div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>
                    {campaign.goal}
                  </div>
                </div>
              </div>
              
              <button style={{
                width: '100%',
                marginTop: '20px',
                padding: '10px',
                background: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                color: '#374151',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                View Details
              </button>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button style={{ 
            padding: '12px 24px', 
            background: '#8b5cf6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            fontWeight: '500',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            Create New Campaign
          </button>
        </div>
      </div>
    </div>
  )
}