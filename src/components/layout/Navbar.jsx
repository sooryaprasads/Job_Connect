"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useNotification } from "../../contexts/NotificationContext"
import { GraduationCap, Menu, X } from "lucide-react"
import NotificationMenu from "../notifications/NotificationMenu"

const Navbar = () => {
  const { currentUser, logout, isAuthenticated } = useAuth()
  const { notifications } = useNotification()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const getDashboardLink = () => {
    if (!currentUser) return "/login"

    switch (currentUser.role) {
      case "employer":
        return "/employer/dashboard"
      case "candidate":
        return "/candidate/dashboard"
      default:
        return "/"
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">JobConnect</span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className={`text-sm ${isActive("/") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}`}
            >
              Home
            </Link>
            <Link
              to="/jobs"
              className={`text-sm ${isActive("/jobs") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}`}
            >
              Jobs
            </Link>
            {isAuthenticated && (
              <Link
                to={getDashboardLink()}
                className={`text-sm ${isActive(getDashboardLink()) ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}`}
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">                {isAuthenticated ? (
              <>
                {currentUser && <NotificationMenu />}
                
                {/* User Avatar with Username */}
                <Link to={getDashboardLink()} className="flex items-center space-x-2">
                  {currentUser.profileImage ? (
                    <img
                      src={currentUser.profileImage}
                      alt={currentUser.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                      {currentUser.name?.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">{currentUser.name?.split(" ")[0]}</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/signup" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400 hover:text-gray-600"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white shadow-md">
          <Link to="/" className={`block py-2 ${isActive("/") ? "text-blue-600 font-medium" : "text-gray-700"}`}>
            Home
          </Link>
          <Link to="/jobs" className={`block py-2 ${isActive("/jobs") ? "text-blue-600 font-medium" : "text-gray-700"}`}>
            Jobs
          </Link>

          {isAuthenticated ? (
            <>
              <Link
                to={getDashboardLink()}
                className={`block py-2 ${isActive(getDashboardLink()) ? "text-blue-600 font-medium" : "text-gray-700"}`}
              >
                Dashboard
              </Link>

              <div className="border-t border-gray-200 my-2 pt-2">
                <div className="flex items-center py-2">
                  {currentUser.profileImage ? (
                    <img
                      src={currentUser.profileImage}
                      alt={currentUser.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
                      {currentUser.name?.charAt(0)}
                    </div>
                  )}
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">{currentUser.name}</p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                  </div>
                </div>

                {currentUser && <NotificationMenu />}

                <button onClick={handleLogout} className="flex items-center w-full py-2 text-gray-700">
                  <span className="text-gray-500 mr-2">Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="border-t border-gray-200 my-2 pt-2 flex flex-col space-y-2">
              <Link to="/login" className="text-gray-700 py-2">
                Login
              </Link>
              <Link to="/signup" className="text-white bg-blue-600 px-4 py-2 rounded-md text-center">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
