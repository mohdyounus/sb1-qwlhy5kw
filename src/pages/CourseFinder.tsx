import React, { useState, useEffect } from 'react';
import { useUniversityData } from '../contexts/UniversityDataContext';
import CourseCard from '../components/courses/CourseCard';
import { Search, Filter, X } from 'lucide-react';
import { Course } from '../contexts/UniversityDataContext';

const CourseFinder: React.FC = () => {
  const { courses, loading, error } = useUniversityData();
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    courseLevel: '',
    fieldOfStudy: '',
    durationYears: '',
    tuitionFeeRange: '',
    examsRequired: '',
    scholarshipAvailable: ''
  });
  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Extract unique values for filters
  const courseLevels = Array.from(new Set(courses.map(course => course.course_level)));
  const fieldsOfStudy = Array.from(new Set(courses.map(course => course.field_of_study)));
  const durationYears = Array.from(new Set(courses.map(course => course.duration_years)));
  const examsRequired = Array.from(new Set(courses.map(course => course.exams_required)));
  
  // Define tuition fee ranges
  const tuitionFeeRanges = [
    { label: 'Under NZD 25,000', min: 0, max: 25000 },
    { label: 'NZD 25,000 - 30,000', min: 25000, max: 30000 },
    { label: 'NZD 30,000 - 35,000', min: 30000, max: 35000 },
    { label: 'Above NZD 35,000', min: 35000, max: Infinity }
  ];

  useEffect(() => {
    if (!loading) {
      filterCourses();
    }
  }, [loading, searchTerm, selectedFilters, courses]);

  const filterCourses = () => {
    let results = [...courses];
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(course => 
        course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.university_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.field_of_study.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply course level filter
    if (selectedFilters.courseLevel) {
      results = results.filter(course => course.course_level === selectedFilters.courseLevel);
    }
    
    // Apply field of study filter
    if (selectedFilters.fieldOfStudy) {
      results = results.filter(course => course.field_of_study === selectedFilters.fieldOfStudy);
    }
    
    // Apply duration filter
    if (selectedFilters.durationYears) {
      results = results.filter(course => course.duration_years === selectedFilters.durationYears);
    }
    
    // Apply tuition fee range filter
    if (selectedFilters.tuitionFeeRange) {
      const selectedRange = tuitionFeeRanges.find(range => range.label === selectedFilters.tuitionFeeRange);
      if (selectedRange) {
        results = results.filter(course => {
          const fee = parseInt(course.tuition_fee_nzd);
          return fee >= selectedRange.min && fee <= selectedRange.max;
        });
      }
    }
    
    // Apply exams required filter
    if (selectedFilters.examsRequired) {
      results = results.filter(course => course.exams_required === selectedFilters.examsRequired);
    }
    
    // Apply scholarship filter
    if (selectedFilters.scholarshipAvailable) {
      results = results.filter(course => 
        course.scholarship_available === selectedFilters.scholarshipAvailable
      );
    }
    
    setFilteredCourses(results);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setSelectedFilters({
      courseLevel: '',
      fieldOfStudy: '',
      durationYears: '',
      tuitionFeeRange: '',
      examsRequired: '',
      scholarshipAvailable: ''
    });
    setSearchTerm('');
  };

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
          Error loading course data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <section className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Find Your Perfect Course</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Discover and compare courses from top New Zealand universities to find the program that matches your academic goals.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses, universities, or fields of study..."
                className="w-full py-3 px-4 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center justify-center w-full bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Filter size={16} className="mr-2" />
                Filter Courses
              </button>
            </div>
            
            {/* Filters Sidebar - Desktop */}
            <div className={`lg:block lg:w-1/4 bg-white p-6 rounded-lg shadow-sm sticky top-24 h-fit hidden`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                {Object.values(selectedFilters).some(value => value !== '') && (
                  <button 
                    onClick={resetFilters}
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Reset All
                  </button>
                )}
              </div>
              
              {/* Course Level Filter */}
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-2">Level of Study</h3>
                <select
                  value={selectedFilters.courseLevel}
                  onChange={(e) => handleFilterChange('courseLevel', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Levels</option>
                  {courseLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              
              {/* Field of Study Filter */}
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-2">Field of Study</h3>
                <select
                  value={selectedFilters.fieldOfStudy}
                  onChange={(e) => handleFilterChange('fieldOfStudy', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Fields</option>
                  {fieldsOfStudy.map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>
              
              {/* Duration Filter */}
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-2">Duration (years)</h3>
                <select
                  value={selectedFilters.durationYears}
                  onChange={(e) => handleFilterChange('durationYears', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Any Duration</option>
                  {durationYears.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>
              
              {/* Tuition Fee Range Filter */}
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-2">Tuition Fee Range</h3>
                <select
                  value={selectedFilters.tuitionFeeRange}
                  onChange={(e) => handleFilterChange('tuitionFeeRange', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Any Range</option>
                  {tuitionFeeRanges.map(range => (
                    <option key={range.label} value={range.label}>{range.label}</option>
                  ))}
                </select>
              </div>
              
              {/* Exams Required Filter */}
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-2">Exams Required</h3>
                <select
                  value={selectedFilters.examsRequired}
                  onChange={(e) => handleFilterChange('examsRequired', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Any Exam</option>
                  {examsRequired.map(exam => (
                    <option key={exam} value={exam}>{exam}</option>
                  ))}
                </select>
              </div>
              
              {/* Scholarship Filter */}
              <div className="mb-6">
                <h3 className="text-md font-semibold text-gray-700 mb-2">Scholarship</h3>
                <select
                  value={selectedFilters.scholarshipAvailable}
                  onChange={(e) => handleFilterChange('scholarshipAvailable', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Courses</option>
                  <option value="Yes">Scholarship Available</option>
                  <option value="No">No Scholarship</option>
                </select>
              </div>
            </div>
            
            {/* Mobile Filters Sidebar */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileFiltersOpen(false)}></div>
                <div className="absolute inset-y-0 right-0 max-w-full w-full md:w-96 bg-white shadow-xl">
                  <div className="p-6 h-full overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                      <button 
                        onClick={() => setMobileFiltersOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    {Object.values(selectedFilters).some(value => value !== '') && (
                      <button 
                        onClick={resetFilters}
                        className="text-sm text-green-600 hover:text-green-700 mb-4"
                      >
                        Reset All Filters
                      </button>
                    )}
                    
                    {/* Mobile Filters - Same as desktop but styled for mobile */}
                    <div className="space-y-6">
                      {/* Course Level Filter */}
                      <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Level of Study</h3>
                        <select
                          value={selectedFilters.courseLevel}
                          onChange={(e) => handleFilterChange('courseLevel', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">All Levels</option>
                          {courseLevels.map(level => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Repeat other filters for mobile... */}
                      <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Field of Study</h3>
                        <select
                          value={selectedFilters.fieldOfStudy}
                          onChange={(e) => handleFilterChange('fieldOfStudy', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">All Fields</option>
                          {fieldsOfStudy.map(field => (
                            <option key={field} value={field}>{field}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Duration (years)</h3>
                        <select
                          value={selectedFilters.durationYears}
                          onChange={(e) => handleFilterChange('durationYears', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">Any Duration</option>
                          {durationYears.map(duration => (
                            <option key={duration} value={duration}>{duration}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Tuition Fee Range</h3>
                        <select
                          value={selectedFilters.tuitionFeeRange}
                          onChange={(e) => handleFilterChange('tuitionFeeRange', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">Any Range</option>
                          {tuitionFeeRanges.map(range => (
                            <option key={range.label} value={range.label}>{range.label}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Exams Required</h3>
                        <select
                          value={selectedFilters.examsRequired}
                          onChange={(e) => handleFilterChange('examsRequired', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">Any Exam</option>
                          {examsRequired.map(exam => (
                            <option key={exam} value={exam}>{exam}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-2">Scholarship</h3>
                        <select
                          value={selectedFilters.scholarshipAvailable}
                          onChange={(e) => handleFilterChange('scholarshipAvailable', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="">All Courses</option>
                          <option value="Yes">Scholarship Available</option>
                          <option value="No">No Scholarship</option>
                        </select>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="w-full mt-6 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Course Results */}
            <div className="lg:w-3/4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Found
                </h2>
              </div>
              
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCourses.map((course, index) => (
                    <CourseCard key={index} course={course} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg text-center">
                  <p className="text-xl text-gray-600 mb-4">No courses found matching your criteria.</p>
                  <button 
                    onClick={resetFilters}
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseFinder;