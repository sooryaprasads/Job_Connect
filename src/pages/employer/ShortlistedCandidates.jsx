import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import { useJob } from "../../contexts/JobContext"
import { Calendar, MapPin, Users, Star, Eye } from "lucide-react"
import Pagination from "../../components/common/Pagination"

const ShortlistedCandidates = () => {
  const navigate = useNavigate()
  const { getShortlistedCandidates } = useJob()
  const [candidates, setCandidates] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeFilter, setTimeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const candidatesPerPage = 10

  useEffect(() => {
    loadCandidates()
  }, [timeFilter, sortBy, currentPage])

  const loadCandidates = async () => {
    setIsLoading(true)
    try {
      const response = await getShortlistedCandidates({ 
        timeFilter, 
        sortBy, 
        page: currentPage,
        status: "shortlisted"
      })
      if (response && response.candidates) {
        setCandidates(response.candidates)
        setTotalPages(Math.ceil(response.total / candidatesPerPage))
      } else {
        setCandidates([])
        setTotalPages(1)
      }
    } catch (error) {
      console.error("Failed to load shortlisted candidates:", error)
      setCandidates([])
      setTotalPages(1)
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  const handleReviewClick = (applicationId) => {
    navigate(`/employer/review/${applicationId}`)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Shortlisted Candidates</h2>
            <p className="mt-1 text-sm text-gray-600">
              Review and manage candidates you've shortlisted
            </p>
          </div>

          {/* Filters */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex space-x-4">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>

          {/* Candidates List */}
          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading candidates...</p>
              </div>
            ) : candidates.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No shortlisted candidates found</p>
              </div>
            ) : (
              <div className="space-y-6">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            {candidate.photo ? (
                              <img
                                src={candidate.photo}
                                alt={candidate.name}
                                className="h-12 w-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                <Users className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {candidate.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {candidate.title}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleReviewClick(candidate.applicationId)}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Review Applicant
                        </button>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {candidate.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Shortlisted {formatDate(candidate.shortlistedAt)}
                        </span>
                      </div>

                      {candidate.skills && Array.isArray(candidate.skills) && (
                        <div className="mt-4">
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {!isLoading && candidates.length > 0 && (
            <div className="p-6 border-t">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ShortlistedCandidates