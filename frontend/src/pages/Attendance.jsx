import { useState, useEffect } from 'react'
import { employeeAPI, attendanceAPI } from '../services/api'
import Modal from '../components/Modal'
import './Attendance.css'

function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    employee_id: '',
    date_from: '',
    date_to: '',
  })
  const [formData, setFormData] = useState({
    employee_id: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
  })
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchEmployees()
    fetchAttendance()
  }, [])

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        setSuccessMessage(null)
        setError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage, error])

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll()
      setEmployees(response.data)
    } catch (err) {
      console.error('Error fetching employees:', err)
    }
  }

  const fetchAttendance = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = {}
      if (filters.employee_id) params.employee_id = filters.employee_id
      if (filters.date_from) params.date_from = filters.date_from
      if (filters.date_to) params.date_to = filters.date_to

      const response = await attendanceAPI.getAll(params)
      setAttendanceRecords(response.data)
    } catch (err) {
      console.error('Error fetching attendance:', err)
      setError('Failed to load attendance records. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.employee_id) {
      errors.employee_id = 'Please select an employee'
    }

    if (!formData.date) {
      errors.date = 'Date is required'
    }

    if (!formData.status) {
      errors.status = 'Status is required'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const applyFilters = () => {
    fetchAttendance()
  }

  const clearFilters = () => {
    setFilters({
      employee_id: '',
      date_from: '',
      date_to: '',
    })
    setTimeout(() => {
      fetchAttendance()
    }, 0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      
      const submitData = {
        employee_id: parseInt(formData.employee_id),
        date: formData.date,
        status: formData.status,
      }

      await attendanceAPI.create(submitData)
      setSuccessMessage('Attendance marked successfully!')
      setIsModalOpen(false)
      setFormData({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
      })
      setFormErrors({})
      fetchAttendance()
    } catch (err) {
      console.error('Error marking attendance:', err)
      const errorMessage = err.response?.data?.detail || 'Failed to mark attendance. Please try again.'
      setError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading && attendanceRecords.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="attendance-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Attendance</h1>
          <p className="page-subtitle">Track and manage employee attendance</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={() => setIsModalOpen(true)}
          disabled={employees.length === 0}
        >
          <span>➕</span>
          Mark Attendance
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success">
          {successMessage}
        </div>
      )}

      {employees.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <h3>No employees found</h3>
          <p>Please add employees before marking attendance</p>
        </div>
      ) : (
        <>
          <div className="card filters-card">
            <h3 className="filters-title">Filters</h3>
            <div className="filters-grid">
              <div className="form-group">
                <label className="form-label">Employee</label>
                <select
                  name="employee_id"
                  className="form-select"
                  value={filters.employee_id}
                  onChange={handleFilterChange}
                >
                  <option value="">All Employees</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.full_name} ({emp.employee_id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">From Date</label>
                <input
                  type="date"
                  name="date_from"
                  className="form-input"
                  value={filters.date_from}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">To Date</label>
                <input
                  type="date"
                  name="date_to"
                  className="form-input"
                  value={filters.date_to}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="filters-actions">
                <button className="btn btn-primary" onClick={applyFilters}>
                  Apply Filters
                </button>
                <button className="btn btn-secondary" onClick={clearFilters}>
                  Clear
                </button>
              </div>
            </div>
          </div>

          {attendanceRecords.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📅</div>
              <h3>No attendance records found</h3>
              <p>Start marking attendance for your employees</p>
            </div>
          ) : (
            <div className="card">
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Employee ID</th>
                      <th>Employee Name</th>
                      <th>Department</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((record) => (
                      <tr key={record.id}>
                        <td>{new Date(record.date).toLocaleDateString()}</td>
                        <td>{record.employee.employee_id}</td>
                        <td>{record.employee.full_name}</td>
                        <td>{record.employee.department}</td>
                        <td>
                          <span
                            className={`badge ${
                              record.status === 'Present'
                                ? 'badge-success'
                                : 'badge-danger'
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setFormData({
            employee_id: '',
            date: new Date().toISOString().split('T')[0],
            status: 'Present',
          })
          setFormErrors({})
        }}
        title="Mark Attendance"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Mark Attendance'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Employee *</label>
            <select
              name="employee_id"
              className="form-select"
              value={formData.employee_id}
              onChange={handleInputChange}
            >
              <option value="">Select an employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.full_name} ({emp.employee_id})
                </option>
              ))}
            </select>
            {formErrors.employee_id && (
              <div className="form-error">{formErrors.employee_id}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Date *</label>
            <input
              type="date"
              name="date"
              className="form-input"
              value={formData.date}
              onChange={handleInputChange}
            />
            {formErrors.date && (
              <div className="form-error">{formErrors.date}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Status *</label>
            <select
              name="status"
              className="form-select"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
            {formErrors.status && (
              <div className="form-error">{formErrors.status}</div>
            )}
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Attendance
