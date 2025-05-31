import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { query } from '../utils/db';

export interface Course {
  id: string;
  university_id: string;
  course_name: string;
  course_level: string;
  field_of_study: string;
  duration_years: number;
  tuition_fee_nzd: number;
  entry_requirements: string;
  exams_required: string;
  scholarship_available: boolean;
  scholarship_details: string | null;
  apply_link: string;
}

export interface University {
  id: string;
  name: string;
  location: string;
  image_url: string | null;
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

export const UniversityDataProvider: React.FC<UniversityDataProviderProps> = ({ children }) => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch universities
        const universitiesResult = await query('SELECT * FROM universities');
        const universitiesData = universitiesResult.rows;

        // Fetch courses
        const coursesResult = await query('SELECT * FROM courses');
        const coursesData = coursesResult.rows;

        // Group courses by university
        const universitiesWithCourses = universitiesData.map((university: University) => ({
          ...university,
          courses: coursesData.filter((course: Course) => course.university_id === university.id)
        }));

        setUniversities(universitiesWithCourses);
        setCourses(coursesData);
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