import React from 'react';
import { useUniversityData } from '../contexts/UniversityDataContext';
import UniversityCard from '../components/universities/UniversityCard';
import { Search } from 'lucide-react';

const Universities: React.FC = () => {
  const { universities, loading, error } = useUniversityData();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredUniversities = universities.filter(university =>
    university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    university.location.toLowerCase().includes(searchTerm.toLowerCase())
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
          Error loading university data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="bg-green-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Universities in New Zealand</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Discover top-ranked universities offering world-class education and research opportunities.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search universities..."
                className="w-full py-3 px-4 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
          </div>
        </div>
      </section>

      {/* Universities Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredUniversities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUniversities.map((university) => (
                <UniversityCard key={university.name} university={university} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-xl text-gray-600">No universities found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Study in New Zealand?</h2>
            
            <div className="space-y-6 text-gray-700">
              <p>
                New Zealand offers a world-class education system with globally recognized qualifications. 
                The country's universities are consistently ranked among the top in the world, providing 
                high-quality education in a safe, welcoming environment.
              </p>
              
              <p>
                As an international student in New Zealand, you'll benefit from:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Internationally recognized qualifications</li>
                <li>Innovative teaching methods and research opportunities</li>
                <li>A safe, stable society with a high quality of life</li>
                <li>Stunning natural landscapes and outdoor activities</li>
                <li>Post-study work opportunities</li>
                <li>A multicultural environment that welcomes international students</li>
              </ul>
              
              <p>
                Dream Scopes provides comprehensive support to help you navigate the admission process, 
                visa requirements, and settling into life in New Zealand. Our expert consultants will guide 
                you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Universities;