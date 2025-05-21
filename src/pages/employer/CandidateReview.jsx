// "use client"

// import { useState, useEffect } from "react"
// import { useParams, useNavigate, Link } from "react-router-dom"
// import { useJob } from "../../contexts/JobContext"
// import { User, Briefcase, CheckCircle, XCircle, ExternalLink, AlertCircle, Mail, Phone } from "lucide-react"
// import DashboardLayout from "../../components/dashboard/DashboardLayout"

// const CandidateReview = () => {
//   const { jobId } = useParams()
//   const navigate = useNavigate()
//   const { getApplicationsByJob, getJobById, updateApplicationStatus } = useJob()
//   const [applications, setApplications] = useState([])
//   const [job, setJob] = useState(null)
//   const [loading, setLoading] = useState(true)
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true)
//       try {
//         const jobData = await getJobById(jobId)
//         const applicationsData = await getApplicationsByJob(jobId)
//         setJob(jobData)
//         setApplications(applicationsData)
//       } catch (error) {
//         console.error("Failed to load data:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [jobId])
//   const handleStatusUpdate = async (applicationId, status) => {
//     try {
//       setError(null)
//       await updateApplicationStatus(applicationId, status)
//       setApplications(prev =>
//         prev.map(app =>
//           app.id === applicationId ? { ...app, status } : app
//         )
//       )
//       // Show success message or toast notification
//     } catch (error) {
//       setError("Failed to update application status. Please try again.")
//       console.error("Failed to update status:", error)
//     }
//   }

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <div className="flex justify-center items-center h-48">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       </DashboardLayout>
//     )
//   }

//   if (!job) {
//     return (
//       <DashboardLayout>
//         <div className="text-center py-8">
//           <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//           <p className="text-gray-900 font-medium mb-2">Job details not found.</p>
//           <Link to="/employer/manage-jobs" className="text-blue-600 hover:text-blue-700">
//             Go back to manage jobs
//           </Link>
//         </div>
//       </DashboardLayout>
//     )
//   }
//   return (
//     <DashboardLayout>
//       <div className="space-y-6">
//         <div className="bg-white shadow rounded-lg">
//           <div className="px-6 py-4 border-b">
//             <h2 className="text-xl font-semibold">Review Candidates for {job.title}</h2>
//             <p className="text-sm text-gray-600 mt-1">Review and manage applications for this position</p>
//           </div>
          
//           <div className="p-6">
//             {applications.length === 0 ? (
//               <div className="text-center py-8">
//                 <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-900 font-medium">No applications yet</p>
//                 <p className="text-gray-500 text-sm">There are no applications to review at this time</p>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {applications.map((application) => (
//                   <div key={application.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
//                     <div className="flex justify-between items-start">
//                       <div className="space-y-2">
//                         <h3 className="font-medium text-lg">{application.candidate.name}</h3>
//                         <div className="space-y-1">
//                           <p className="flex items-center text-gray-600">
//                             <Mail className="h-4 w-4 mr-2" />
//                             {application.candidate.email}
//                           </p>
//                           <p className="flex items-center text-gray-600">
//                             <Phone className="h-4 w-4 mr-2" />
//                             {application.candidate.phone}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => handleStatusUpdate(application.id, 'accepted')}
//                           className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
//                         >
//                           <CheckCircle className="h-5 w-5" />
//                         </button>
//                         <button
//                           onClick={() => handleStatusUpdate(application.id, 'rejected')}
//                           className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
//                         >
//                           <XCircle className="h-5 w-5" />
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className="mt-4">
//                       <h4 className="font-medium mb-2">Application Details</h4>
//                       {application.answers && (
//                         <div className="space-y-2">
//                           {job.questions?.map((question, index) => (
//                             <div key={index} className="bg-gray-50 p-3 rounded">
//                               <p className="text-sm font-medium text-gray-700">{question}</p>
//                               <p className="mt-1 text-gray-600">{application.answers[index]}</p>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
                    
//                     {application.resumeUrl && (
//                       <div className="mt-4 flex justify-end">
//                         <a
//                           href={application.resumeUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center text-blue-600 hover:text-blue-800"
//                         >
//                           <ExternalLink className="h-4 w-4 mr-1" />
//                           View Resume
//                         </a>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   )
// }

// export default CandidateReview
import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useJob } from "../../contexts/JobContext"
import { Download, Mail, Phone, MapPin, Building, GraduationCap, Clock, AlertCircle } from "lucide-react"
import DashboardLayout from "../../components/dashboard/DashboardLayout"

const CandidateReview = () => {
  const { applicationId } = useParams()
  const navigate = useNavigate()
  const { getApplicationById } = useJob()
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadApplication()
  }, [applicationId])

  const loadApplication = async () => {
    try {
      const data = await getApplicationById(applicationId)
      if (!data) {
        setError("Application not found")
        return
      }
      setApplication(data)
    } catch (err) {
      setError("Failed to load application details")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !application) {
    return (
      <DashboardLayout>
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-900 font-medium mb-2">{error || "Application not found"}</p>
          <Link 
            to="/employer/dashboard" 
            className="text-blue-600 hover:text-blue-700"
          >
            Return to Dashboard
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Candidate Application Review</h2>
            <p className="mt-1 text-sm text-gray-600">
              Review application details and candidate information
            </p>
          </div>

          <div className="p-6 space-y-6">
            {/* Candidate Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {application.candidate.name}
                  </h3>
                  <p className="text-sm text-gray-500">{application.candidate.title}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <a
                    href={`mailto:${application.candidate.email}`}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  <a
                    href={`tel:${application.candidate.phone}`}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{application.candidate.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span>Applied {formatDate(application.appliedAt)}</span>
                </div>
              </div>
            </div>

            {/* Application Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Application Details</h3>
              
              {application.coverLetter && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Cover Letter</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 whitespace-pre-wrap">{application.coverLetter}</p>
                  </div>
                </div>
              )}

              {application.answers && application.answers.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Application Questions</h4>
                  <div className="space-y-4">
                    {application.answers.map((answer, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Question {index + 1}:
                        </p>
                        <p className="text-gray-700">{answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resume Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Resume & Documents</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-white rounded-md">
                    <Download className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Candidate Resume</p>
                    <p className="text-sm text-gray-500">PDF Document</p>
                  </div>
                </div>
                <a
                  href={application.resumeUrl}
                  download
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Download Resume
                </a>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between">
                <Link
                  to="/employer/shortlisted-candidates"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Back to Candidates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CandidateReview