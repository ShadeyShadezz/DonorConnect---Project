// app/staff-login/tasks/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'


export default function TasksPage() {
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
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#0369a1' }}>5</div>
            <div style={{ fontSize: '14px', color: '#0c4a6e' }}>Pending</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#fef3c7', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#92400e' }}>3</div>
            <div style={{ fontSize: '14px', color: '#78350f' }}>In Progress</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#d1fae5', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#065f46' }}>12</div>
            <div style={{ fontSize: '14px', color: '#064e3b' }}>Completed</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#fee2e2', borderRadius: '8px' }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#991b1b' }}>1</div>
            <div style={{ fontSize: '14px', color: '#7f1d1d' }}>Overdue</div>
          </div>
        </div>

        <h2 style={{ fontSize: '24px', color: '#374151', marginBottom: '24px' }}>
          Recent Tasks
        </h2>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px',
          marginBottom: '40px'
        }}>
          {[
            { title: 'Send thank you emails to recent donors', priority: 'High', due: 'Today' },
            { title: 'Follow up with major gift prospects', priority: 'High', due: 'Tomorrow' },
            { title: 'Prepare monthly fundraising report', priority: 'Medium', due: 'Dec 25' },
            { title: 'Update donor contact information', priority: 'Low', due: 'Dec 30' },
            { title: 'Schedule social media posts', priority: 'Medium', due: 'Dec 28' },
          ].map((task, index) => (
            <div key={index} style={{
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
                  Due: {task.due}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  background: task.priority === 'High' ? '#fee2e2' : 
                             task.priority === 'Medium' ? '#fef3c7' : '#d1fae5',
                  color: task.priority === 'High' ? '#991b1b' : 
                         task.priority === 'Medium' ? '#92400e' : '#065f46'
                }}>
                  {task.priority}
                </span>
                <button style={{
                  padding: '8px 16px',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Mark Complete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
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
            Add New Task
          </button>
        </div>
      </div>
    </div>
  )
}