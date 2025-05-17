import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Papa from 'papaparse';

export interface Course {
  university_name: string;
  location: string;
  image_url: string;
  course_name: string;
  course_level: string;
  field_of_study: string;
  duration_years: string;
  tuition_fee_nzd: string;
  entry_requirements: string;
  exams_required: string;
  scholarship_available: string;
  scholarship_details: string;
  apply_link: string;
}

export interface University {
  name: string;
  location: string;
  image_url: string;
  courses: Course[];
}

interface UniversityDataContextType {
  universities: University[];
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const UniversityDataContext = createContext<UniversityDataContextType | undefined>(undefined);

export const useUniversityData = () => {
  const context = useContext(UniversityDataContext);
  if (context === undefined) {
    throw new Error('useUniversityData must be used within a UniversityDataProvider');
  }
  return context;
};

interface UniversityDataProviderProps {
  children: ReactNode;
}

// Sample data for initial load - would normally be loaded from CSV
const sampleData = [
  {
    university_name: "University of Auckland",
    location: "Auckland",
    image_url: "https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?q=80&w=2076&auto=format&fit=crop",
    course_name: "Master of Data Science",
    course_level: "Postgraduate",
    field_of_study: "IT",
    duration_years: "2",
    tuition_fee_nzd: "35000",
    entry_requirements: "Bachelor's in relevant field",
    exams_required: "IELTS",
    scholarship_available: "Yes",
    scholarship_details: "University of Auckland International Student Scholarship - up to $10,000",
    apply_link: "https://www.auckland.ac.nz/en/study.html"
  },
  {
    university_name: "University of Otago",
    location: "Dunedin",
    image_url: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=2874&auto=format&fit=crop",
    course_name: "Bachelor of Commerce",
    course_level: "Undergraduate",
    field_of_study: "Business",
    duration_years: "3",
    tuition_fee_nzd: "27000",
    entry_requirements: "High school diploma with good grades",
    exams_required: "IELTS",
    scholarship_available: "No",
    scholarship_details: "",
    apply_link: "https://www.otago.ac.nz/study"
  },
  {
    university_name: "AUT University",
    location: "Auckland",
    image_url: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2940&auto=format&fit=crop",
    course_name: "Master of Public Health",
    course_level: "Postgraduate",
    field_of_study: "Health",
    duration_years: "2",
    tuition_fee_nzd: "32000",
    entry_requirements: "Relevant bachelor's degree + experience",
    exams_required: "PTE",
    scholarship_available: "Yes",
    scholarship_details: "AUT International Excellence Scholarship",
    apply_link: "https://www.aut.ac.nz/courses"
  },
  {
    university_name: "University of Canterbury",
    location: "Christchurch",
    image_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d977758?q=80&w=2940&auto=format&fit=crop",
    course_name: "Bachelor of Engineering",
    course_level: "Undergraduate",
    field_of_study: "Engineering",
    duration_years: "4",
    tuition_fee_nzd: "30000",
    entry_requirements: "High school diploma with math/science",
    exams_required: "IELTS",
    scholarship_available: "Yes",
    scholarship_details: "UC International First Year Scholarship - $10,000-20,000",
    apply_link: "https://www.canterbury.ac.nz/study"
  },
  {
    university_name: "Victoria University of Wellington",
    location: "Wellington",
    image_url: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?q=80&w=2940&auto=format&fit=crop",
    course_name: "Master of International Relations",
    course_level: "Postgraduate",
    field_of_study: "Social Sciences",
    duration_years: "2",
    tuition_fee_nzd: "33000",
    entry_requirements: "Bachelor's degree",
    exams_required: "TOEFL",
    scholarship_available: "Yes",
    scholarship_details: "VUW International Excellence Scholarship",
    apply_link: "https://www.wgtn.ac.nz/study"
  }
];

export const UniversityDataProvider: React.FC<UniversityDataProviderProps> = ({ children }) => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // In a real implementation, we would fetch and parse the CSV here
        // For now, we'll use the sample data
        setCourses(sampleData as Course[]);
        
        // Group courses by university to create university objects
        const universityMap = new Map<string, University>();
        
        sampleData.forEach(course => {
          if (!universityMap.has(course.university_name)) {
            universityMap.set(course.university_name, {
              name: course.university_name,
              location: course.location,
              image_url: course.image_url,
              courses: []
            });
          }
          
          const university = universityMap.get(course.university_name);
          if (university) {
            university.courses.push(course as Course);
          }
        });
        
        setUniversities(Array.from(universityMap.values()));
        setLoading(false);
      } catch (err) {
        setError('Failed to load university data');
        setLoading(false);
        console.error('Error loading data:', err);
      }
    };

    loadData();
  }, []);

  return (
    <UniversityDataContext.Provider value={{ universities, courses, loading, error }}>
      {children}
    </UniversityDataContext.Provider>
  );
};