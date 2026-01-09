'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Campaign {
  id: string
  name: string
  description?: string
  goal: number
  status: string
  createdAt: string
  donations: any[]
}

export default function CampaignsPage() {
  const [user, setUser] = useState<any>(null)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', description: '', goal: '', status: 'active' })
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
    
    fetchCampaigns()
  }, [router])

  const fetchCampaigns = async () => {
    try {
      const res = await fetch('/api/staff/campaigns')
      if (res.ok) {
        const data = await res.json()
        setCampaigns(data)
      }
    } catch (error) {
      console.error('Error fetching campaigns:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/staff/campaigns/${editingId}` : '/api/staff/campaigns'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        setFormData({ name: '', description: '', goal: '', status: 'active' })
        setEditingId(null)
        setShowForm(false)
        fetchCampaigns()
      }
    } catch (error) {
      console.error('Error saving campaign:', error)
    }
  }

  const handleEdit = (campaign: Campaign) => {
    setFormData({ name: campaign.name, description: campaign.description || '', goal: campaign.goal.toString(), status: campaign.status })
    setEditingId(campaign.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    try {
      const res = await fetch(`/api/staff/campaigns/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchCampaigns()
      }
    } catch (error) {
      console.error('Error deleting campaign:', error)
    }
  }

  const calculateProgress = (campaign: Campaign) => {
    const raised = campaign.donations.reduce((sum: number, d: any) => sum + d.amount, 0)
    return campaign.goal > 0 ? Math.round((raised / campaign.goal) * 100) : 0
  }

  if (!user) return <div>Loading...</div>

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', minHeight: 'calc(100vh - 200px)' }}>
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
        {showForm && (
          <div style={{ marginBottom: '30px', padding: '20px', background: '#f3f4f6', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '20px' }}>{editingId ? 'Edit Campaign' : 'Create Campaign'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Campaign Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #d1d5db', borderRadius: '6px' }}
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ width: '100%', padding: '10px', marginBottom: '15px', border: '1px solid #d1d5db', borderRadius: '6px', minHeight: '80px' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <input
                  type="number"
                  placeholder="Goal Amount"
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  required
                  style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="paused">Paused</option>
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
                  onClick={() => { setShowForm(false); setEditingId(null); }}
                  style={{ padding: '10px 20px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', color: '#374151' }}>Campaigns</h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              style={{ padding: '10px 20px', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              Create Campaign
            </button>
          )}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {campaigns.map((campaign) => {
              const progress = calculateProgress(campaign)
              const raised = campaign.donations.reduce((sum: number, d: any) => sum + d.amount, 0)
              return (
                <div key={campaign.id} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '10px',
                  padding: '24px',
                  background: 'white'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0 0 16px 0' }}>
                    {campaign.name}
                  </h3>
                  {campaign.description && (
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                      {campaign.description}
                    </p>
                  )}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>Progress</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{progress}%</span>
                    </div>
                    <div style={{
                      height: '8px',
                      background: '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: '#3b82f6',
                        borderRadius: '4px'
                      }}></div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Raised</div>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: '#10b981' }}>
                        ${raised.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>Goal</div>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>
                        ${campaign.goal.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <span style={{ display: 'inline-block', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', marginBottom: '12px',
                    background: campaign.status === 'active' ? '#d1fae5' : '#fef3c7',
                    color: campaign.status === 'active' ? '#065f46' : '#92400e'
                  }}>
                    {campaign.status}
                  </span>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button
                      onClick={() => handleEdit(campaign)}
                      style={{ flex: 1, padding: '8px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(campaign.id)}
                      style={{ flex: 1, padding: '8px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}