'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Donation {
  id: string
  amount: number
  status: string
  donorId: string
  donor: { name: string; email: string }
  campaignId?: string
  campaign?: { name: string }
  createdAt: string
}

interface Donor {
  id: string
  name: string
  email: string
}

interface Campaign {
  id: string
  name: string
}

export default function DonationsPage() {
  const [user, setUser] = useState<any>(null)
  const [donations, setDonations] = useState<Donation[]>([])
  const [donors, setDonors] = useState<Donor[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ amount: '', donorId: '', campaignId: '', status: 'processed' })
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
    
    fetchData()
  }, [router])

  const fetchData = async () => {
    try {
      const [donationsRes, donorsRes, campaignsRes] = await Promise.all([
        fetch('/api/staff/donations'),
        fetch('/api/staff/donors'),
        fetch('/api/staff/campaigns')
      ])
      
      if (donationsRes.ok) setDonations(await donationsRes.json())
      if (donorsRes.ok) setDonors(await donorsRes.json())
      if (campaignsRes.ok) setCampaigns(await campaignsRes.json())
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/staff/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        setFormData({ amount: '', donorId: '', campaignId: '', status: 'processed' })
        setShowForm(false)
        fetchData()
      } else {
        const error = await res.json()
        alert(error.error)
      }
    } catch (error) {
      console.error('Error creating donation:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    try {
      const res = await fetch(`/api/staff/donations/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchData()
      }
    } catch (error) {
      console.error('Error deleting donation:', error)
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', minHeight: 'calc(100vh - 200px)' }}>
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
        {showForm && (
          <div style={{ marginBottom: '30px', padding: '20px', background: '#f3f4f6', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '20px' }}>Record New Donation</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <input
                  type="number"
                  placeholder="Amount"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                  step="0.01"
                  style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                />
                <select
                  value={formData.donorId}
                  onChange={(e) => setFormData({ ...formData, donorId: e.target.value })}
                  required
                  style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                >
                  <option value="">Select Donor</option>
                  {donors.map((donor) => (
                    <option key={donor.id} value={donor.id}>
                      {donor.name} ({donor.email})
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <select
                  value={formData.campaignId}
                  onChange={(e) => setFormData({ ...formData, campaignId: e.target.value })}
                  style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                >
                  <option value="">Select Campaign (Optional)</option>
                  {campaigns.map((campaign) => (
                    <option key={campaign.id} value={campaign.id}>
                      {campaign.name}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                >
                  <option value="processed">Processed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  style={{ padding: '10px 20px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', color: '#374151' }}>All Donations</h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              Record Donation
            </button>
          )}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>Donor</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>Amount</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>Campaign</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px', color: '#374151' }}>
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '12px', color: '#374151' }}>
                      {donation.donor.name}
                    </td>
                    <td style={{ padding: '12px', color: '#374151', fontWeight: '600' }}>
                      ${donation.amount.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px', color: '#374151' }}>
                      {donation.campaign?.name || '-'}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        background: donation.status === 'processed' ? '#d1fae5' : '#fef3c7',
                        color: donation.status === 'processed' ? '#065f46' : '#92400e'
                      }}>
                        {donation.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => handleDelete(donation.id)}
                        style={{ padding: '5px 10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}