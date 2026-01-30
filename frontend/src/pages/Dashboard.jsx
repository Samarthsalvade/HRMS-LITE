import { useState, useEffect } from 'react'
import { employeeAPI, attendanceAPI } from '../services/api'
import './Dashboard.css'

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalAttendanceRecords: 0,
    presentToday: 0,
    absentToday: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [employeesResponse, attendanceResponse] = await Promise.all([
        employeeAPI.getAll(),
        attendanceAPI.getAll(),
      ])

      const today = new Date().toISOString().split('T')[0]
      const todayAttendance = attendanceResponse.data.filter(
        (record) => record.date === today
      )

      setStats({
        totalEmployees: employeesResponse.data.length,
        totalAttendanceRecords: attendanceResponse.data.length,
        presentToday: todayAttendance.filter((r) => r.status === 'Present').length,
        absentToday: todayAttendance.filter((r) => r.status === 'Absent').length,
      })
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError('Failed to load dashboard data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-error">
        {error}
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: '👥',
      color: '#2563eb',
    },
    {
      title: 'Present Today',
      value: stats.presentToday,
      icon: '✅',
      color: '#16a34a',
    },
    {
      title: 'Absent Today',
      value: stats.absentToday,
      icon: '❌',
      color: '#dc2626',
    },
    {
      title: 'Total Records',
      value: stats.totalAttendanceRecords,
      icon: '📊',
      color: '#ea580c',
    },
  ]

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview of your HR management system</p>
      </div>

      <div className="stats-grid">
        {statCards.map((stat) => (
          <div key={stat.title} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-title">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-info">
        <div className="card">
          <h2 className="card-title">Welcome to HRMS Lite</h2>
          <p className="card-text">
            Manage your employees and track attendance efficiently. Use the navigation above to:
          </p>
          <ul className="feature-list">
            <li>
              <span className="feature-icon">👥</span>
              <span>Add, view, and manage employee records</span>
            </li>
            <li>
              <span className="feature-icon">📅</span>
              <span>Track daily attendance with present/absent status</span>
            </li>
            <li>
              <span className="feature-icon">📊</span>
              <span>View attendance statistics and records</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
