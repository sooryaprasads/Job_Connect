"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import api from "../services/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          handleLogout()
        } else {
          // Get user data from local storage
          const userData = JSON.parse(localStorage.getItem("userData") || "{}")
          setCurrentUser(userData)
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }
      } catch (error) {
        handleLogout()
      }
    }
    setLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userData")
    delete api.defaults.headers.common["Authorization"]
    setCurrentUser(null)
  }

  const login = async (email, password) => {
    try {
      setError(null)
      // In a real app, this would be an API call
      let userData

      if (email === "employer@example.com") {
        userData = {
          id: "emp1",
          name: "Tech Solutions Inc.",
          email,
          role: "employer",
          phone: "+1 (555) 123-4567",
          address: "123 Tech Park, Silicon Valley",
          company: "Tech Solutions Inc.",
          position: "HR Director",
          specialization: "Tech Recruitment",
          bio: "Leading technology solutions provider specializing in multiple domains",
          profileImage: null,
          industry: "Technology",
          companySize: "1000+ employees",
          website: "https://techsolutions.com"
        }
      } else if (email === "candidate@example.com") {
        userData = {
          id: 2,
          name: "Candidate User",
          email,
          role: "candidate",
          phone: "+1 (555) 987-6543",
          address: "456 Job Seeker St, San Francisco, CA",
          skills: "JavaScript, React, Node.js",
          education: "BS Computer Science, Stanford University",
          experience: "3 years as Frontend Developer",
          bio: "Passionate developer looking for new opportunities in tech.",
          profileImage: null,
        }
      } else {
        userData = {
          id: Math.floor(Math.random() * 1000),
          name: "Demo User",
          email,
          role: "candidate",
          phone: "",
          address: "",
          skills: "",
          education: "",
          experience: "",
          bio: "",
          profileImage: null,
        }
      }

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImNhbmRpZGF0ZSIsImV4cCI6MTcxNzAyNDQwMH0.8Yvd5VBvTGBvKA7Hw9-WFVJl9VBmgGVG4RmTxmgMQZY"

      localStorage.setItem("token", token)
      localStorage.setItem("userData", JSON.stringify(userData))
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setCurrentUser(userData)
      return userData
    } catch (err) {
      setError(err.message || "Failed to login")
      throw err
    }
  }

  const signup = async (userData) => {
    try {
      setError(null)
      const { fullName, email, userType, ...rest } = userData
      const role = userType.toLowerCase()

      const newUser = {
        id: Math.floor(Math.random() * 1000),
        name: fullName,
        email,
        role,
        ...rest,
        // Role-specific fields initialized as empty if not provided
        ...(role === "candidate" && {
          skills: rest.skills || "",
          education: rest.education || "",
          experience: rest.experience || "",
        }),
        ...(role === "employer" && {
          company: rest.company || "",
          position: rest.position || "",
          specialization: rest.specialization || "",
        }),
      }

      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImNhbmRpZGF0ZSIsImV4cCI6MTcxNzAyNDQwMH0.8Yvd5VBvTGBvKA7Hw9-WFVJl9VBmgGVG4RmTxmgMQZY"

      localStorage.setItem("token", token)
      localStorage.setItem("userData", JSON.stringify(newUser))
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setCurrentUser(newUser)
      return newUser
    } catch (err) {
      setError(err.message || "Failed to sign up")
      throw err
    }
  }

  const updateProfile = async (updatedData) => {
    try {
      setError(null)
      const updatedUser = {
        ...currentUser,
        ...updatedData,
      }
      localStorage.setItem("userData", JSON.stringify(updatedUser))
      setCurrentUser(updatedUser)
      return updatedUser
    } catch (err) {
      setError(err.message || "Failed to update profile")
      throw err
    }
  }

  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout: handleLogout,
    updateProfile,
    isAuthenticated: !!currentUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
