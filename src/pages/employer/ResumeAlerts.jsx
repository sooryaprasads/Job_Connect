"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useJob } from "../../contexts/JobContext"
import { useAuth } from "../../contexts/AuthContext"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import { Bell, Plus, Edit2, Trash2, Users } from "lucide-react"

const ResumeAlerts = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const { getResumeAlertsByEmployer, deleteResumeAlert, updateResumeAlert } = useJob()
  const [alerts, setAlerts] = useState([])
  const [editingAlert, setEditingAlert] = useState(null)
  const [editFormData, setEditFormData] = useState({
    title: "",
    jobTitle: "",
    skills: [],
    experienceLevel: "",
    education: "",
    location: "",
    salary: "",
    frequency: ""
  })

  useEffect(() => {
    if (currentUser) {
      const employerAlerts = getResumeAlertsByEmployer(currentUser.id)
      setAlerts(employerAlerts)
    }
  }, [currentUser, getResumeAlertsByEmployer])

  const handleEditClick = (alert) => {
    setEditingAlert(alert)
    setEditFormData({
      ...alert,
      skills: Array.isArray(alert.skills) ? alert.skills.join(", ") : alert.skills
    })
  }

  const handleEditFormChange = (e) => {
    const { name, value } = e.target
    setEditFormData(prev => ({
      ...prev,
      [name]: name === "skills" ? value : value
    }))
  }

  const handleUpdateAlert = async (e) => {
    e.preventDefault()
    try {
      const updatedAlert = {
        ...editingAlert,
        ...editFormData,
        skills: editFormData.skills.split(",").map(skill => skill.trim()),
        lastUpdated: new Date().toISOString()
      }
      await updateResumeAlert(editingAlert.id, updatedAlert)
      setAlerts(prev => prev.map(alert => 
        alert.id === editingAlert.id ? updatedAlert : alert
      ))
      setEditingAlert(null)
    } catch (error) {
      console.error("Failed to update alert:", error)
    }
  }

  const handleCancelEdit = () => {
    setEditingAlert(null)
    setEditFormData({
      title: "",
      jobTitle: "",
      skills: [],
      experienceLevel: "",
      education: "",
      location: "",
      salary: "",
      frequency: ""
    })
  }

  const handleDelete = async (alertId) => {
    try {
      await deleteResumeAlert(alertId)
      setAlerts(alerts => alerts.filter(alert => alert.id !== alertId))
    } catch (error) {
      console.error("Failed to delete alert:", error)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-900">Resume Alerts</h2>
          <button
            onClick={() => navigate("/employer/resume-alerts/new")}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Alert
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {alerts.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No alerts</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new resume alert.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">              {alerts.map((alert) => (
                <li key={alert.id} className="p-6">
                  {editingAlert?.id === alert.id ? (
                    <form onSubmit={handleUpdateAlert} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Alert Title</label>
                          <input
                            type="text"
                            name="title"
                            value={editFormData.title}
                            onChange={handleEditFormChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Job Title</label>
                          <input
                            type="text"
                            name="jobTitle"
                            value={editFormData.jobTitle}
                            onChange={handleEditFormChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Experience Level</label>
                          <input
                            type="text"
                            name="experienceLevel"
                            value={editFormData.experienceLevel}
                            onChange={handleEditFormChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
                          <input
                            type="text"
                            name="skills"
                            value={editFormData.skills}
                            onChange={handleEditFormChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Location</label>
                          <input
                            type="text"
                            name="location"
                            value={editFormData.location}
                            onChange={handleEditFormChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                          <input
                            type="text"
                            name="salary"
                            value={editFormData.salary}
                            onChange={handleEditFormChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{alert.title}</h3>
                        <div className="mt-2 space-y-2">
                          <p className="text-sm text-gray-500">Job Title: {alert.jobTitle}</p>
                          <p className="text-sm text-gray-500">Experience: {alert.experienceLevel}</p>
                          <p className="text-sm text-gray-500">Location: {alert.location}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Users className="h-4 w-4" />
                            <span>{alert.matches?.length || 0} matching candidates</span>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {alert.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="ml-4 flex items-center space-x-4">
                        <button
                          onClick={() => navigate(`/employer/resume-alerts/${alert.id}/matches`)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View Matches"
                        >
                          <Users className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEditClick(alert)}
                          className="text-gray-400 hover:text-gray-500"
                          title="Edit Alert"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(alert.id)}
                          className="text-red-400 hover:text-red-500"
                          title="Delete Alert"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ResumeAlerts