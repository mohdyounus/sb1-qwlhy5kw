import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, DollarSign, FileText, GraduationCap, ExternalLink } from 'lucide-react';
import { useUniversityData } from '../contexts/UniversityDataContext';
import CourseCard from '../components/courses/CourseCard';

const UniversityDetail: React.FC = () => {
  const { universityName } = useParams<{ universityName: string }>();
  const { universities, loading, error } = useUniversityData();
  
  const university = universities.find(u => 
    u.name === decodeURIComponent(universityName || '')
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !university) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-red-600">
          {error || "University not found. Please check the URL or go back to universities list."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* University Hero */}
      <section className="relative h-80">
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
          backgroundImage: `url(${university.image_url || 'https://images.unsplash.com/photo-1592280771190-3e2e4d977758?q=80&w=2940&auto=format&fit=crop'})`,
          filter: 'brightness(0.7)'
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">{university.name}</h1>
          <div className="flex items-center text-white mb-6">
            <MapPin size={18} className="mr-2" />
            <span>{university.location}, New Zealand</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <a 
              href={university.courses[0]?.apply_link || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              <span>Visit Official Website</span>
              <ExternalLink size={16} className="ml-2" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center bg-white text-green-700 hover:bg-gray-100 font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              <span>Enquire Now</span>
            </Link>
          </div>
        </div>
      </section>

      {/* University Overview */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Overview</h2>
            <p className="text-gray-700 mb-8">
              {university.name} is a prestigious institution located in {university.location}, New Zealand. 
              The university offers a wide range of undergraduate and postgraduate programs across various 
              disciplines. With state-of-the-art facilities, world-class faculty, and a vibrant campus life, 
              {university.name} provides an excellent academic environment for international students.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Key Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <GraduationCap size={20} className="mr-3 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Programs Offered:</span>
                      <span className="ml-2">Undergraduate, Postgraduate</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Calendar size={20} className="mr-3 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Academic Calendar:</span>
                      <span className="ml-2">February - November</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FileText size={20} className="mr-3 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Application Deadlines:</span>
                      <span className="ml-2">Varies by program</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <DollarSign size={20} className="mr-3 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <span className="font-semibold">Tuition Fee Range:</span>
                      <span className="ml-2">
                        NZD {Math.min(...university.courses.map(c => parseInt(c.tuition_fee_nzd)))} - 
                        NZD {Math.max(...university.courses.map(c => parseInt(c.tuition_fee_nzd)))} per year
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Admission Requirements</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold">Academic Requirements:</span>
                      <span className="ml-2">{university.courses[0]?.entry_requirements || 'Varies by program'}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold">English Proficiency:</span>
                      <span className="ml-2">{university.courses[0]?.exams_required || 'IELTS/TOEFL/PTE'}</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-green-600 mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold">Additional Documents:</span>
                      <span className="ml-2">Statement of Purpose, Reference Letters, CV</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Offered */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Courses Offered</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {university.courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Apply?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Contact our consultants today for personalized guidance on the application process for {university.name}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-block bg-white text-green-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300">
              Contact Us
            </Link>
            <Link to="/course-finder" className="inline-block bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition duration-300">
              Explore More Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UniversityDetail;