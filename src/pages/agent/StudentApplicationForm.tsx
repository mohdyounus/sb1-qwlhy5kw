import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useUniversityData } from '../../contexts/UniversityDataContext';

interface FormData {
  // Personal Information
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  passportNumber: string;
  preferredIntake: string;

  // Academic Background
  highestQualification: string;
  graduationYear: string;
  institutionName: string;
  gpa: string;
  englishTest: string;
  englishScore: string;

  // Course Selection
  countryPreference: string;
  selectedUniversities: string[];
  selectedCourses: string[];
  budgetRange: string;
  universityReason: string;
}

const StudentApplicationForm: React.FC = () => {
  const navigate = useNavigate();
  const { universities } = useUniversityData();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    passportNumber: '',
    preferredIntake: '',
    highestQualification: '',
    graduationYear: '',
    institutionName: '',
    gpa: '',
    englishTest: '',
    englishScore: '',
    countryPreference: 'New Zealand',
    selectedUniversities: [],
    selectedCourses: [],
    budgetRange: '',
    universityReason: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, options } = e.target;
    const values = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    setFormData(prev => ({
      ...prev,
      [name]: values
    }));
  };

  const handleSubmit = () => {
    // Here we would normally submit the data to the backend
    console.log('Form submitted:', formData);
    navigate('/agent/dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Student Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Passport Number</label>
                <input
                  type="text"
                  name="passportNumber"
                  value={formData.passportNumber}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Intake</label>
                <select
                  name="preferredIntake"
                  value={formData.preferredIntake}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  required
                >
                  <option value="">Select Intake</option>
                  <option value="January">January</option>
                  <option value="May">May</option>
                  <option value="September">September</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Academic Background</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Highest Qualification</label>
                <input
                  type="text"
                  name="highestQualification"
                  value={formData.highestQualification}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
                <input
                  type="text"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Institution Name</label>
                <input
                  type="text"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">GPA / Percentage</label>
                <input
                  type="text"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">English Test</label>
                <select
                  name="englishTest"
                  value={formData.englishTest}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  required
                >
                  <option value="">Select Test</option>
                  <option value="IELTS">IELTS</option>
                  <option value="TOEFL">TOEFL</option>
                  <option value="Duolingo">Duolingo</option>
                  <option value="None">None</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Test Score</label>
                <input
                  type="text"
                  name="englishScore"
                  value={formData.englishScore}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  required={formData.englishTest !== 'None'}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Course & University Selection</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Country Preference</label>
                <input
                  type="text"
                  value="New Zealand"
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Universities</label>
                <select
                  multiple
                  name="selectedUniversities"
                  value={formData.selectedUniversities}
                  onChange={handleMultiSelect}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  size={5}
                  required
                >
                  {universities.map(uni => (
                    <option key={uni.name} value={uni.name}>{uni.name}</option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple universities</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Courses</label>
                <select
                  multiple
                  name="selectedCourses"
                  value={formData.selectedCourses}
                  onChange={handleMultiSelect}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  size={5}
                  required
                >
                  {universities
                    .filter(uni => formData.selectedUniversities.includes(uni.name))
                    .flatMap(uni => uni.courses)
                    .map(course => (
                      <option key={course.course_name} value={course.course_name}>
                        {course.course_name}
                      </option>
                    ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple courses</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Budget Range (NZD per year)</label>
                <select
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  required
                >
                  <option value="">Select Budget Range</option>
                  <option value="20000-30000">20,000 - 30,000</option>
                  <option value="30000-40000">30,000 - 40,000</option>
                  <option value="40000-50000">40,000 - 50,000</option>
                  <option value="50000+">Above 50,000</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Why these universities?</label>
                <textarea
                  name="universityReason"
                  value={formData.universityReason}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nz-blue focus:ring-nz-blue"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Supporting Documents</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Check className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Document upload functionality coming soon. Your application can still be submitted without documents.
                  </p>
                </div>
              </div>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Academic Transcripts
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button disabled className="text-gray-400 cursor-not-allowed">
                      Upload
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-yellow-600 text-sm">Pending</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    Passport Copy
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button disabled className="text-gray-400 cursor-not-allowed">
                      Upload
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-yellow-600 text-sm">Pending</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    English Test Results
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button disabled className="text-gray-400 cursor-not-allowed">
                      Upload
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-yellow-600 text-sm">Pending</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-6">Review & Submit</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Application Summary</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Personal Information</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <p>Name: {formData.fullName}</p>
                      <p>Email: {formData.email}</p>
                      <p>Phone: {formData.phone}</p>
                      <p>Nationality: {formData.nationality}</p>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Academic Background</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <p>Qualification: {formData.highestQualification}</p>
                      <p>Institution: {formData.institutionName}</p>
                      <p>English Test: {formData.englishTest}</p>
                      <p>Score: {formData.englishScore}</p>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Selected Universities</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <ul className="list-disc pl-4">
                        {formData.selectedUniversities.map(uni => (
                          <li key={uni}>{uni}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Selected Courses</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <ul className="list-disc pl-4">
                        {formData.selectedCourses.map(course => (
                          <li key={course}>{course}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {['Personal Info', 'Academic', 'Course Selection', 'Documents', 'Review'].map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > index + 1 ? 'bg-green-500' :
                    currentStep === index + 1 ? 'bg-nz-blue' : 'bg-gray-300'
                  } text-white`}>
                    {currentStep > index + 1 ? <Check size={16} /> : index + 1}
                  </div>
                  <span className="mt-2 text-sm text-gray-600">{step}</span>
                </div>
                {index < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 1}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentStep === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            <ChevronLeft size={20} className="mr-1" />
            Previous
          </button>
          
          {currentStep < 5 ? (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="flex items-center px-4 py-2 bg-nz-blue hover:bg-nz-blue-dark text-white rounded-lg"
            >
              Next
              <ChevronRight size={20} className="ml-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              Submit Application
              <Check size={20} className="ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentApplicationForm;