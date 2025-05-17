import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, School, GraduationCap, Globe } from 'lucide-react';
import { useUniversityData } from '../contexts/UniversityDataContext';
import UniversityCard from '../components/universities/UniversityCard';
import TestimonialCard from '../components/home/TestimonialCard';
import EnquiryModal from '../components/common/EnquiryModal';

const HomePage: React.FC = () => {
  const { universities } = useUniversityData();
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl text-white pt-20 animate-fadeIn">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
              Your Journey to Study in New Zealand Starts Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Expert guidance for educational opportunities and immigration pathways to New Zealand's top universities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/course-finder" 
                className="inline-block bg-nz-blue hover:bg-nz-blue-dark text-white font-semibold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105"
              >
                Find Courses
              </Link>
              <button 
                onClick={() => setIsEnquiryModalOpen(true)}
                className="inline-block bg-transparent hover:bg-white/10 text-white border-2 border-white font-semibold py-4 px-8 rounded-lg transition duration-300"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Dream Scopes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive support to help you achieve your educational goals in New Zealand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-nz-blue mb-4">
                <School size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Expert Guidance</h3>
              <p className="text-gray-600">
                Personalized advice from consultants with deep knowledge of New Zealand's education system.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-nz-blue mb-4">
                <GraduationCap size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">University Partnerships</h3>
              <p className="text-gray-600">
                Strong relationships with top New Zealand universities for smoother applications.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-nz-blue mb-4">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Visa Success</h3>
              <p className="text-gray-600">
                High visa approval rates through our proven application support process.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-nz-blue mb-4">
                <Globe size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">End-to-End Support</h3>
              <p className="text-gray-600">
                Comprehensive assistance from university selection to arrival in New Zealand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Universities Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Universities</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover top educational institutions in New Zealand offering world-class programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universities.slice(0, 3).map((university) => (
              <UniversityCard key={university.name} university={university} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/universities" 
              className="inline-block bg-nz-blue hover:bg-nz-blue-dark text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              View All Universities
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Student Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from students who achieved their dreams with our support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Sarah Johnson"
              university="University of Auckland"
              image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              quote="Dream Scopes made my application process so smooth. Their guidance helped me secure a scholarship at Auckland University."
            />
            
            <TestimonialCard 
              name="Michael Chen"
              university="University of Otago"
              image="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              quote="The consultants were incredibly knowledgeable and helped me navigate the complex visa requirements. I'm now thriving at Otago!"
            />
            
            <TestimonialCard 
              name="Priya Patel"
              university="AUT University"
              image="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              quote="From course selection to accommodation arrangements, Dream Scopes supported me every step of the way. Highly recommended!"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            filter: 'brightness(0.3)'
          }}
        />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Begin Your Academic Journey?
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Contact our consultants today for a personalized consultation and take the first step towards studying in New Zealand.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-white text-nz-blue hover:bg-gray-100 font-semibold py-4 px-10 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Schedule a Consultation
          </Link>
        </div>
      </section>

      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />

      {/* Scroll Animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateY(0); }
          50% { transform: translateY(6px); }
          100% { transform: translateY(0); }
        }
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;