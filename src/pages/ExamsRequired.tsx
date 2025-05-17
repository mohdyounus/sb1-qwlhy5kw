import React from 'react';
import { ExternalLink, BookOpen, HelpCircle, Check } from 'lucide-react';

interface ExamInfo {
  name: string;
  fullName: string;
  description: string;
  acceptedScores: string;
  website: string;
  features: string[];
}

const ExamsRequired: React.FC = () => {
  const exams: ExamInfo[] = [
    {
      name: 'IELTS',
      fullName: 'International English Language Testing System',
      description: 'IELTS is one of the most widely accepted English language proficiency tests for higher education and global migration. It assesses all four language skills: listening, reading, writing, and speaking.',
      acceptedScores: 'Most New Zealand universities require an overall band score of 6.0-6.5 with no band less than 5.5-6.0 for undergraduate studies, and 6.5-7.0 for postgraduate programs.',
      website: 'https://www.ielts.org',
      features: [
        'Two test formats: Academic and General Training',
        'Results available within 13 calendar days',
        'Valid for 2 years from the test date',
        'Available in over 140 countries'
      ]
    },
    {
      name: 'TOEFL',
      fullName: 'Test of English as a Foreign Language',
      description: 'TOEFL measures your ability to use and understand English at the university level. It evaluates how well you combine your listening, reading, speaking and writing skills to perform academic tasks.',
      acceptedScores: 'New Zealand universities typically require a TOEFL iBT score of 80-90 for undergraduate and 90-100 for postgraduate programs.',
      website: 'https://www.ets.org/toefl',
      features: [
        'Primarily delivered as an internet-based test (TOEFL iBT)',
        'Results available approximately 10 days after the test',
        'Valid for 2 years from the test date',
        'Accepted by more than 11,000 universities in over 150 countries'
      ]
    },
    {
      name: 'PTE',
      fullName: 'Pearson Test of English Academic',
      description: 'PTE Academic is a computer-based academic English language test aimed at non-native English speakers wanting to study abroad. It tests reading, writing, listening and speaking.',
      acceptedScores: 'Most New Zealand institutions accept PTE Academic scores of 50-58 for undergraduate and 58-65 for postgraduate programs.',
      website: 'https://www.pearsonpte.com',
      features: [
        'Computer-based test completed in a single 3-hour session',
        'Fast results, typically available within 48 hours',
        'Valid for 2 years from the test date',
        'Uses AI scoring for unbiased assessment'
      ]
    },
    {
      name: 'GRE',
      fullName: 'Graduate Record Examination',
      description: 'The GRE is a standardized test that is an admissions requirement for many graduate schools worldwide. It measures verbal reasoning, quantitative reasoning, analytical writing, and critical thinking skills.',
      acceptedScores: 'Score requirements vary by program. Competitive programs may require scores in the 75th percentile or higher.',
      website: 'https://www.ets.org/gre',
      features: [
        'Required for many graduate programs, especially in the US',
        'Computer adaptive format for the quantitative and verbal sections',
        'Scores valid for 5 years',
        'Offered year-round at test centers worldwide'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Exams Required</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Learn about the standardized tests required for admission to New Zealand universities and how to prepare for them.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">English Proficiency Tests</h2>
            <p className="text-lg text-gray-700 mb-8">
              International students whose first language is not English must demonstrate English language proficiency 
              through standardized tests. Below are the commonly accepted tests by New Zealand universities.
            </p>
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            {exams.map((exam, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{exam.name}</h3>
                      <p className="text-lg text-green-600">{exam.fullName}</p>
                    </div>
                    <a 
                      href={exam.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-4 md:mt-0 inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                    >
                      <span>Official Website</span>
                      <ExternalLink size={16} className="ml-1" />
                    </a>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="col-span-2">
                      <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
                        <BookOpen size={18} className="mr-2 text-green-600" />
                        Description
                      </h4>
                      <p className="text-gray-700">{exam.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="flex items-center text-lg font-semibold text-gray-800 mb-2">
                        <HelpCircle size={18} className="mr-2 text-green-600" />
                        Accepted Scores
                      </h4>
                      <p className="text-gray-700">{exam.acceptedScores}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {exam.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check size={16} className="mt-1 mr-2 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Tips */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Preparation Tips</h2>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Start Early</h3>
                  <p className="text-gray-700">
                    Begin your test preparation at least 3-6 months before your planned test date. This gives you ample 
                    time to identify your strengths and weaknesses and work on improving your skills.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Understand the Test Format</h3>
                  <p className="text-gray-700">
                    Familiarize yourself with the structure, question types, and time constraints of your chosen test. 
                    This will help reduce anxiety and improve your performance on test day.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Take Practice Tests</h3>
                  <p className="text-gray-700">
                    Regular practice tests simulate the actual exam experience and help you improve your time management. 
                    Most official test websites offer free sample questions and practice materials.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Consider Preparation Courses</h3>
                  <p className="text-gray-700">
                    If self-study isn't yielding the desired results, consider enrolling in a preparation course. 
                    These courses provide structured learning and expert guidance tailored to your chosen test.
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
          <h2 className="text-3xl font-bold mb-6">Need Help With Exam Preparation?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Our consultants can provide guidance on test preparation strategies and resources to help you achieve your target scores.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-white text-green-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default ExamsRequired;