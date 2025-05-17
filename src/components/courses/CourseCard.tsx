import React from 'react';
import { Calendar, DollarSign, Award, ExternalLink } from 'lucide-react';
import { Course } from '../../contexts/UniversityDataContext';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="inline-block px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full mb-3">
          {course.course_level}
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">{course.course_name}</h3>
        <p className="text-gray-600 mb-4">{course.field_of_study}</p>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-gray-700">
            <Calendar size={16} className="mr-2 text-green-600" />
            <span>Duration: {course.duration_years} years</span>
          </div>
          <div className="flex items-center text-gray-700">
            <DollarSign size={16} className="mr-2 text-green-600" />
            <span>Tuition: NZD {course.tuition_fee_nzd} per year</span>
          </div>
          {course.scholarship_available === 'Yes' && (
            <div className="flex items-center text-green-600">
              <Award size={16} className="mr-2" />
              <span>Scholarship Available</span>
            </div>
          )}
        </div>
        
        <a 
          href={course.apply_link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-300"
        >
          <span>Apply Now</span>
          <ExternalLink size={14} className="ml-1" />
        </a>
      </div>
    </div>
  );
};

export default CourseCard;