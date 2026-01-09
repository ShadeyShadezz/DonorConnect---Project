'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Task {
  id: string
  title: string
  description?: string
  status: string
  dueDate?: string
  createdAt: string
}

export default function TasksPage() {
  const [user, setUser] = useState<any>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: '', description: '', status: 'pending', dueDate: '' })
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
    
    fetchTasks()
  }, [router])

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/staff/tasks')
      if (res.ok) {
        const data = await res.json()
        setTasks(data)
      }
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId ? `/api/staff/tasks/${editingId}` : '/api/staff/tasks'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (res.ok) {
        setFormData({ title: '', description: '', status: 'pending', dueDate: '' })
        setEditingId(null)
        setShowForm(false)
        fetchTasks()
      }
    } catch (error) {
      console.error('Error saving task:', error)
    }
  }

  const handleEdit = (task: Task) => {
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
    })
    setEditingId(task.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    try {
      const res = await fetch(`/api/staff/tasks/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchTasks()
      }
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const getTaskStats = () => {
    return {
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in_progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
      overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'completed').length
    }
  }

  if (!user) return <div>Loading...</div>

  const stats = getTaskStats()

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', minHeight: 'calc(100vh - 200px)' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937', margin: '0 0 8px 0' }}>
          Tasks
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Manage your to-do list and follow-ups
        </p>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{ textAlign: 'center', padding: '20px', background: '#f0f9ff', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#0369a1' }}>{stats.pending}</div>
            <div style={{ fontSize: '14px', color: '#0c4a6e' }}>Pending</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#fef3c7', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#92400e' }}>{stats.inProgress}</div>
            <div style={{ fontSize: '14px', color: '#78350f' }}>In Progress</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#d1fae5', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#065f46' }}>{stats.completed}</div>
            <div style={{ fontSize: '14px', color: '#064e3b' }}>Completed</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#fee2e2', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#991b1b' }}>{stats.overdue}</div>
            <div style={{ fontSize: '14px', color: '#7f1d1d' }}>Overdue</div>
          </div>
        </div>

        {showForm && (
          <div style={{ marginBottom: '30px', padding: '20px', background: '#f3f4f6', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '20px' }}>{editingId ? 'Edit Task' : 'Add New Task'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Task Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  style={{ padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px' }}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
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
                  style={{ padding: '10px 20px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '24px', color: '#374151' }}>Tasks</h2>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
            >
              Add Task
            </button>
          )}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {tasks.map((task) => (
              <div key={task.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                background: '#f9fafb'
              }}>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '500', color: '#111827', marginBottom: '4px' }}>
                    {task.title}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    {task.description && <p style={{ margin: '4px 0' }}>{task.description}</p>}
                    {task.dueDate && <p style={{ margin: '0' }}>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    background: task.status === 'completed' ? '#d1fae5' :
                               task.status === 'in_progress' ? '#fef3c7' : '#f0f9ff',
                    color: task.status === 'completed' ? '#065f46' :
                           task.status === 'in_progress' ? '#92400e' : '#0369a1'
                  }}>
                    {task.status.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => handleEdit(task)}
                    style={{
                      padding: '8px 16px',
                      background: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    style={{
                      padding: '8px 16px',
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}