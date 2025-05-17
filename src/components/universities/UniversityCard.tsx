import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BookOpen } from 'lucide-react';
import { University } from '../../contexts/UniversityDataContext';

interface UniversityCardProps {
  university: University;
}

const UniversityCard: React.FC<UniversityCardProps> = ({ university }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img 
          src={university.image_url || 'https://images.unsplash.com/photo-1592280771190-3e2e4d977758?q=80&w=2940&auto=format&fit=crop'} 
          alt={university.name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{university.name}</h3>
        
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin size={16} className="mr-1" />
          <span>{university.location}, New Zealand</span>
        </div>
        
        <div className="flex items-center text-green-600 mb-4">
          <BookOpen size={16} className="mr-1" />
          <span>{university.courses.length} Courses Available</span>
        </div>
        
        <Link 
          to={`/universities/${encodeURIComponent(university.name)}`}
          className="block text-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default UniversityCard;