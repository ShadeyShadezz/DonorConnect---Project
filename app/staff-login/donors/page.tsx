'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Donor {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  createdAt: string
  donations: any[]
}

export default function DonorsPage() {
  const [user, setUser] = useState<any>(null)
  const [donors, setDonors] = useState<Donor[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' })
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
    
    fetchDonors()
  }, [router])

  const fetchDonors = async () => {
    try {
      const res = await fetch('/api/staff/donors')
      if (res.ok) {
        const data = await res.json()
        setDonors(data)
      }
    } catch (error) {
      console.error('Error fetching donors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/staff/donors/${editingId}` : '/api/staff/donors'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        setFormData({ name: '', email: '', phone: '', address: '' })
        setEditingId(null)
        setShowForm(false)
        fetchDonors()
      }
    } catch (error) {
      console.error('Error saving donor:', error)
    }
  }

  const handleEdit = (donor: Donor) => {
    setFormData({ name: donor.name, email: donor.email, phone: donor.phone || '', address: donor.address || '' })
    setEditingId(donor.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    try {
      const res = await fetch(`/api/staff/donors/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchDonors()
      }
    } catch (error) {
      console.error('Error deleting donor:', error)
    }
  }

  if (!user) return <div>Loading...</div>

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', minHeight: 'calc(100vh - 200px)' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937', margin: '0 0 8px 0' }}>
          Donors
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Manage donor information and records
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
            <h3 style={{ marginBottom: '20px' }}>{editingId ? 'Edit Donor' : 'Add New Donor'}</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                />
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
                  style={{ padding: '10px 20px', background: '#gray', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', color: '#374151' }}>Donor List</h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              Add Donor
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
                  <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>Email</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>Phone</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>Donations</th>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#6b7280', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor) => (
                  <tr key={donor.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px', color: '#374151' }}>{donor.name}</td>
                    <td style={{ padding: '12px', color: '#374151' }}>{donor.email}</td>
                    <td style={{ padding: '12px', color: '#374151' }}>{donor.phone || '-'}</td>
                    <td style={{ padding: '12px', color: '#374151' }}>{donor.donations.length}</td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => handleEdit(donor)}
                        style={{ padding: '5px 10px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(donor.id)}
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