import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UniversityDataProvider } from './contexts/UniversityDataContext';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoginPage from './components/auth/LoginPage';
import HomePage from './pages/HomePage';
import CourseFinder from './pages/CourseFinder';
import Universities from './pages/Universities';
import UniversityDetail from './pages/UniversityDetail';
import ExamsRequired from './pages/ExamsRequired';
import Scholarships from './pages/Scholarships';
import Contact from './pages/Contact';
import AgentDashboard from './pages/agent/AgentDashboard';
import StudentApplicationForm from './pages/agent/StudentApplicationForm';
import AdminDashboard from './pages/admin/AdminDashboard';
import StudentApplicationView from './pages/admin/StudentApplicationView';
import AgentView from './pages/admin/AgentView';

function App() {
  return (
    <Router>
      <AuthProvider>
        <UniversityDataProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/course-finder" element={<CourseFinder />} />
                <Route path="/universities" element={<Universities />} />
                <Route path="/universities/:universityName" element={<UniversityDetail />} />
                <Route path="/exams-required" element={<ExamsRequired />} />
                <Route path="/scholarships" element={<Scholarships />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Protected Routes */}
                <Route 
                  path="/agent/dashboard" 
                  element={
                    <PrivateRoute allowedRoles={['agent']}>
                      <AgentDashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/agent/applications/new" 
                  element={
                    <PrivateRoute allowedRoles={['agent']}>
                      <StudentApplicationForm />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <PrivateRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/admin/applications/:applicationId" 
                  element={
                    <PrivateRoute allowedRoles={['admin']}>
                      <StudentApplicationView />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/admin/agents/:agentId" 
                  element={
                    <PrivateRoute allowedRoles={['admin']}>
                      <AgentView />
                    </PrivateRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </UniversityDataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;