import { useState, useEffect } from 'react'
import { employeeAPI } from '../services/api'
import Modal from '../components/Modal'
import './Employees.css'

function Employees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchEmployees()
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
      setLoading(true)
      setError(null)
      const response = await employeeAPI.getAll()
      setEmployees(response.data)
    } catch (err) {
      console.error('Error fetching employees:', err)
      setError('Failed to load employees. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.employee_id.trim()) {
      errors.employee_id = 'Employee ID is required'
    }

    if (!formData.full_name.trim()) {
      errors.full_name = 'Full name is required'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format'
    }

    if (!formData.department.trim()) {
      errors.department = 'Department is required'
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      await employeeAPI.create(formData)
      setSuccessMessage('Employee added successfully!')
      setIsModalOpen(false)
      setFormData({
        employee_id: '',
        full_name: '',
        email: '',
        department: '',
      })
      setFormErrors({})
      fetchEmployees()
    } catch (err) {
      console.error('Error creating employee:', err)
      const errorMessage = err.response?.data?.detail || 'Failed to add employee. Please try again.'
      setError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      setError(null)
      await employeeAPI.delete(id)
      setSuccessMessage('Employee deleted successfully!')
      setDeleteConfirm(null)
      fetchEmployees()
    } catch (err) {
      console.error('Error deleting employee:', err)
      setError('Failed to delete employee. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="employees-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your employee records</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <span>➕</span>
          Add Employee
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
          <h3>No employees yet</h3>
          <p>Get started by adding your first employee</p>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            Add Employee
          </button>
        </div>
      ) : (
        <div className="card">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Present Days</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.employee_id}</td>
                    <td>{employee.full_name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>
                      <span className="badge badge-success">
                        {employee.total_present_days || 0} days
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => setDeleteConfirm(employee)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setFormData({
            employee_id: '',
            full_name: '',
            email: '',
            department: '',
          })
          setFormErrors({})
        }}
        title="Add New Employee"
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
              {submitting ? 'Adding...' : 'Add Employee'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Employee ID *</label>
            <input
              type="text"
              name="employee_id"
              className="form-input"
              value={formData.employee_id}
              onChange={handleInputChange}
              placeholder="e.g., EMP001"
            />
            {formErrors.employee_id && (
              <div className="form-error">{formErrors.employee_id}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="full_name"
              className="form-input"
              value={formData.full_name}
              onChange={handleInputChange}
              placeholder="e.g., John Doe"
            />
            {formErrors.full_name && (
              <div className="form-error">{formErrors.full_name}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="e.g., john@example.com"
            />
            {formErrors.email && (
              <div className="form-error">{formErrors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Department *</label>
            <input
              type="text"
              name="department"
              className="form-input"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="e.g., Engineering"
            />
            {formErrors.department && (
              <div className="form-error">{formErrors.department}</div>
            )}
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title="Confirm Delete"
        footer={
          <>
            <button
              className="btn btn-secondary"
              onClick={() => setDeleteConfirm(null)}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(deleteConfirm.id)}
            >
              Delete
            </button>
          </>
        }
      >
        <p>
          Are you sure you want to delete <strong>{deleteConfirm?.full_name}</strong>?
          This action cannot be undone and will also delete all attendance records for this employee.
        </p>
      </Modal>
    </div>
  )
}

export default Employees
