import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, User, BookOpen, FileText, CheckCircle } from 'lucide-react';

const StudentApplicationView: React.FC = () => {
  const navigate = useNavigate();

  // Mock student application data
  const studentData = {
    personalInfo: {
      fullName: "John Smith",
      email: "john.smith@email.com",
      phone: "+64 21 123 4567",
      dateOfBirth: "1998-05-15",
      gender: "Male",
      nationality: "Indian",
      passportNumber: "N1234567",
      preferredIntake: "September"
    },
    academicBackground: {
      highestQualification: "Bachelor of Science",
      graduationYear: "2022",
      institutionName: "University of Delhi",
      gpa: "3.8",
      englishTest: "IELTS",
      englishScore: "7.5"
    },
    courseSelection: {
      countryPreference: "New Zealand",
      selectedUniversities: ["University of Auckland", "AUT University"],
      selectedCourses: ["Master of Data Science", "Master of Information Technology"],
      budgetRange: "30000-40000",
      universityReason: "I chose these universities for their excellent research facilities and industry connections in the field of Data Science."
    },
    applicationStatus: {
      status: "Under Review",
      submittedDate: "2024-03-15",
      lastUpdated: "2024-03-16",
      agentId: "agent001",
      applicationId: "APP001"
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Dashboard
          </button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Student Application Details</h1>
              <p className="text-gray-600">Application ID: {studentData.applicationStatus.applicationId}</p>
            </div>
            <div className={`px-4 py-2 rounded-full ${
              studentData.applicationStatus.status === 'Under Review' ? 'bg-blue-100 text-blue-800' :
              studentData.applicationStatus.status === 'Approved' ? 'bg-green-100 text-green-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {studentData.applicationStatus.status}
            </div>
          </div>
        </div>

        {/* Application Content */}
        <div className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <User className="text-green-600 mr-2" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">Full Name</label>
                <p className="mt-1 text-gray-800">{studentData.personalInfo.fullName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <p className="mt-1 text-gray-800">{studentData.personalInfo.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Phone</label>
                <p className="mt-1 text-gray-800">{studentData.personalInfo.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Date of Birth</label>
                <p className="mt-1 text-gray-800">{studentData.personalInfo.dateOfBirth}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Gender</label>
                <p className="mt-1 text-gray-800">{studentData.personalInfo.gender}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Nationality</label>
                <p className="mt-1 text-gray-800">{studentData.personalInfo.nationality}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Passport Number</label>
                <p className="mt-1 text-gray-800">{studentData.personalInfo.passportNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Preferred Intake</label>
                <p className="mt-1 text-gray-800">{studentData.personalInfo.preferredIntake}</p>
              </div>
            </div>
          </div>

          {/* Academic Background */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="text-green-600 mr-2" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Academic Background</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">Highest Qualification</label>
                <p className="mt-1 text-gray-800">{studentData.academicBackground.highestQualification}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Graduation Year</label>
                <p className="mt-1 text-gray-800">{studentData.academicBackground.graduationYear}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Institution Name</label>
                <p className="mt-1 text-gray-800">{studentData.academicBackground.institutionName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">GPA</label>
                <p className="mt-1 text-gray-800">{studentData.academicBackground.gpa}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">English Test</label>
                <p className="mt-1 text-gray-800">{studentData.academicBackground.englishTest}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">English Score</label>
                <p className="mt-1 text-gray-800">{studentData.academicBackground.englishScore}</p>
              </div>
            </div>
          </div>

          {/* Course Selection */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <Calendar className="text-green-600 mr-2" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Course Selection</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600">Country Preference</label>
                <p className="mt-1 text-gray-800">{studentData.courseSelection.countryPreference}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Selected Universities</label>
                <ul className="mt-1 list-disc list-inside">
                  {studentData.courseSelection.selectedUniversities.map((uni, index) => (
                    <li key={index} className="text-gray-800">{uni}</li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Selected Courses</label>
                <ul className="mt-1 list-disc list-inside">
                  {studentData.courseSelection.selectedCourses.map((course, index) => (
                    <li key={index} className="text-gray-800">{course}</li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Budget Range (NZD)</label>
                <p className="mt-1 text-gray-800">{studentData.courseSelection.budgetRange}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Reason for University Selection</label>
                <p className="mt-1 text-gray-800">{studentData.courseSelection.universityReason}</p>
              </div>
            </div>
          </div>

          {/* Supporting Documents */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <FileText className="text-green-600 mr-2" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Supporting Documents</h2>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Document upload functionality coming soon. Application can still be processed without documents.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Application Timeline */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Application Timeline</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-6">
                  <div className="relative">
                    <div className="h-3 w-3 bg-green-600 rounded-full"></div>
                    <div className="absolute top-3 left-1.5 w-px h-full bg-gray-300"></div>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-800">Application Submitted</p>
                  <p className="text-xs text-gray-500">{studentData.applicationStatus.submittedDate}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-6">
                  <div className="relative">
                    <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-800">Status Updated to Under Review</p>
                  <p className="text-xs text-gray-500">{studentData.applicationStatus.lastUpdated}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentApplicationView;