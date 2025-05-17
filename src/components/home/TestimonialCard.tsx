import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  university: string;
  image: string;
  quote: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, university, image, quote }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start mb-4">
        <div className="mr-4">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{name}</h3>
          <p className="text-green-600">{university}</p>
        </div>
      </div>
      
      <div className="relative">
        <Quote className="text-gray-200 absolute top-0 left-0 -mt-2 -ml-2" size={36} />
        <p className="text-gray-600 relative z-10 pl-6 pt-4">
          {quote}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;