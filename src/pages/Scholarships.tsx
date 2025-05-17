import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Calendar, DollarSign, School, ExternalLink } from 'lucide-react';
import { useUniversityData } from '../contexts/UniversityDataContext';

const Scholarships: React.FC = () => {
  const { courses, loading, error } = useUniversityData();
  
  // Filter courses with scholarships
  const coursesWithScholarships = courses.filter(course => 
    course.scholarship_available === 'Yes' && 
    course.scholarship_details.trim() !== ''
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-red-600">
          Error loading scholarship data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Scholarships</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore scholarship opportunities at New Zealand universities to help fund your education.
          </p>
        </div>
      </section>

      {/* Scholarships List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Available Scholarships</h2>
            <p className="text-lg text-gray-700">
              The following scholarships are available for international students at various New Zealand universities. 
              Each scholarship has specific eligibility criteria and application deadlines.
            </p>
          </div>

          {coursesWithScholarships.length > 0 ? (
            <div className="space-y-8 max-w-5xl mx-auto">
              {coursesWithScholarships.map((course, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <Award size={24} className="text-green-600 mr-3" />
                      <h3 className="text-xl font-bold text-gray-800">{course.scholarship_details}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <div className="flex items-center text-gray-700 mb-2">
                          <School size={18} className="mr-2 text-green-600" />
                          <span>University: {course.university_name}</span>
                        </div>
                        <div className="flex items-center text-gray-700 mb-2">
                          <Calendar size={18} className="mr-2 text-green-600" />
                          <span>Program: {course.course_name}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <DollarSign size={18} className="mr-2 text-green-600" />
                          <span>Tuition Fee: NZD {course.tuition_fee_nzd} per year</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Eligibility:</h4>
                        <p className="text-gray-700 mb-4">
                          Open to international students admitted to {course.course_name} at {course.university_name}. 
                          Typically requires academic excellence and may consider extracurricular achievements.
                        </p>
                        
                        <div className="flex space-x-4">
                          <a 
                            href={course.apply_link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                          >
                            <span>Apply</span>
                            <ExternalLink size={16} className="ml-1" />
                          </a>
                          
                          <Link 
                            to={`/universities/${encodeURIComponent(course.university_name)}`}
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                          >
                            <span>View University</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600">
                No scholarships found in the database. Please check back later or contact us for more information on available scholarships.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* General Scholarships Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Other Scholarship Opportunities</h2>
            
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">New Zealand International Doctoral Research Scholarships</h3>
                <p className="text-gray-700 mb-4">
                  Fully funded scholarships for international students pursuing doctoral degrees at New Zealand universities. 
                  Covers tuition fees and living stipend for up to 36 months.
                </p>
                <a 
                  href="https://enz.govt.nz/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                >
                  <span>Learn More</span>
                  <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Manaaki New Zealand Scholarships</h3>
                <p className="text-gray-700 mb-4">
                  Government-funded scholarships for students from developing countries. Covers full tuition, 
                  living expenses, travel, and other allowances.
                </p>
                <a 
                  href="https://www.mfat.govt.nz/en/aid-and-development/new-zealand-scholarships-for-international-tertiary-students/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                >
                  <span>Learn More</span>
                  <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">New Zealand Excellence Awards</h3>
                <p className="text-gray-700 mb-4">
                  Scholarships offered to students from specific countries, providing partial tuition fee waivers 
                  for undergraduate and postgraduate studies.
                </p>
                <a 
                  href="https://enz.govt.nz/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                >
                  <span>Learn More</span>
                  <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Tips */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Scholarship Application Tips</h2>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Start Early</h3>
                  <p className="text-gray-700">
                    Most scholarship applications have deadlines several months before the academic year begins. 
                    Start researching and preparing your applications at least 6-12 months in advance.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Check Eligibility Criteria</h3>
                  <p className="text-gray-700">
                    Carefully review all eligibility requirements before applying. Some scholarships have specific 
                    academic, nationality, or field of study requirements.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Prepare Strong Personal Statements</h3>
                  <p className="text-gray-700">
                    Craft compelling personal statements that highlight your achievements, goals, and why you 
                    deserve the scholarship. Tailor each statement to the specific scholarship.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Obtain Quality References</h3>
                  <p className="text-gray-700">
                    Request recommendation letters from professors or employers who know you well and can 
                    speak to your academic abilities and potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help With Your Scholarship Application?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Our consultants can provide guidance on scholarship opportunities and help you prepare competitive applications.
          </p>
          <Link 
            to="/contact"
            className="inline-block bg-white text-green-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Get Expert Advice
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Scholarships;