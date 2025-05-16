import { useState, useEffect } from "react"
import { useJob } from "../../contexts/JobContext"
import DashboardLayout from "../../components/dashboard/DashboardLayout"
import { Star, Download, Phone, Mail, MapPin, Briefcase, Building, GraduationCap, UserCheck, Calendar } from "lucide-react"

const ShortlistedResumes = () => {
  const { applications, getApplicationsByJob, jobs, updateApplicationStatus } = useJob()
  const [matchingResumes, setMatchingResumes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadMatchingResumes()
  }, [])

  const loadMatchingResumes = () => {
    // In a real app, this would use a matching algorithm
    // For now, we'll simulate matching based on skills
    const matched = applications
      .filter(app => {
        const job = jobs.find(j => j.id === app.jobId);
        if (!job || !app.candidate?.skills || !job.requirements) return false;
        
        // Simple matching - check if candidate has any required skills
        const candidateSkills = app.candidate.skills.map(s => s.toLowerCase());
        const jobRequirements = job.requirements.map(r => r.toLowerCase());
        return candidateSkills.some(skill => jobRequirements.includes(skill));
      })
      .map(app => ({
        ...app,
        job: jobs.find(job => job.id === app.jobId),
        matchScore: calculateMatchScore(app, jobs.find(job => job.id === app.jobId))
      }));

    setMatchingResumes(matched);
    setIsLoading(false);
  }

  const calculateMatchScore = (application, job) => {
    if (!job || !application.candidate?.skills || !job.requirements) return 0;
    
    const candidateSkills = application.candidate.skills.map(s => s.toLowerCase());
    const jobRequirements = job.requirements.map(r => r.toLowerCase());
    
    const matchingSkills = candidateSkills.filter(skill => 
      jobRequirements.includes(skill)
    ).length;
    
    return Math.round((matchingSkills / jobRequirements.length) * 100);
  }

  const handleShortlistCandidate = async (applicationId) => {
    try {
      await updateApplicationStatus(applicationId, "shortlisted")
      // Remove from matching resumes list
      setMatchingResumes(prev => 
        prev.filter(resume => resume.id !== applicationId)
      )
    } catch (error) {
      console.error("Failed to shortlist candidate:", error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-6 border-b">
            <div className="flex items-center">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900">Matching Resumes</h2>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Review resumes that match your job requirements
            </p>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-gray-500">Finding matching resumes...</p>
              </div>
            ) : matchingResumes.length === 0 ? (
              <div className="text-center py-8">
                <Star className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No matching resumes</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No candidates currently match your job requirements
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {matchingResumes.map((resume) => (
                  <div key={resume.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {resume.candidate?.name || 'Unknown Candidate'}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Match Score: {resume.matchScore}% for {resume.job?.title}
                          </p>
                        </div>
                        <button
                          onClick={() => handleShortlistCandidate(resume.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          <UserCheck className="h-4 w-4 mr-1.5" />
                          Shortlist Candidate
                        </button>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Mail className="h-4 w-4 mr-1.5" />
                          {resume.candidate?.email || 'No email provided'}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="h-4 w-4 mr-1.5" />
                          {resume.candidate?.phone || 'No phone provided'}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <GraduationCap className="h-4 w-4 mr-1.5" />
                          {resume.candidate?.education || 'No education details'}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Briefcase className="h-4 w-4 mr-1.5" />
                          {resume.candidate?.experience || 'No experience details'}
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1.5" />
                          Shortlisted on: {formatDate(resume.appliedAt)}
                        </div>
                        <a
                          href={resume.resumeUrl}
                          download
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download Resume
                        </a>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Matching Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {resume.candidate?.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ShortlistedResumes