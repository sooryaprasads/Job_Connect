"use client"

import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />
  }



  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Redirect to home if not authorized
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
