import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Mail, Phone, Calendar, FileText } from 'lucide-react';

interface Application {
  id: string;
  studentName: string;
  universities: string[];
  status: string;
  dateSubmitted: string;
  lastUpdated: string;
}

const AgentView: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();

  // Mock agent data
  const agentData = {
    id: agentId,
    name: "Sarah Wilson",
    email: "sarah.wilson@dreamscopes.com",
    phone: "+64 21 555 7890",
    joinDate: "2023-01-15",
    status: "Active",
    location: "Auckland, New Zealand",
    totalApplications: 25,
    successRate: "92%",
    applications: [
      {
        id: "APP001",
        studentName: "John Smith",
        universities: ["University of Auckland", "AUT University"],
        status: "Pending",
        dateSubmitted: "2024-03-15",
        lastUpdated: "2024-03-15"
      },
      {
        id: "APP002",
        studentName: "Sarah Johnson",
        universities: ["University of Otago"],
        status: "Approved",
        dateSubmitted: "2024-03-14",
        lastUpdated: "2024-03-16"
      }
    ] as Application[]
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Dashboard
          </button>
          
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Agent Profile</h1>
            <div className={`px-3 py-1 rounded-full ${
              agentData.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {agentData.status}
            </div>
          </div>
        </div>

        {/* Agent Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-4">
                <User className="text-green-600 mr-2" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Personal Information</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Agent ID</label>
                  <p className="mt-1 text-gray-800">{agentData.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Name</label>
                  <p className="mt-1 text-gray-800">{agentData.name}</p>
                </div>
                <div className="flex items-center">
                  <Mail className="text-gray-400 mr-2" size={16} />
                  <p className="text-gray-800">{agentData.email}</p>
                </div>
                <div className="flex items-center">
                  <Phone className="text-gray-400 mr-2" size={16} />
                  <p className="text-gray-800">{agentData.phone}</p>
                </div>
                <div className="flex items-center">
                  <Calendar className="text-gray-400 mr-2" size={16} />
                  <p className="text-gray-800">Joined: {new Date(agentData.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <FileText className="text-green-600 mr-2" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Performance Overview</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Location</label>
                  <p className="mt-1 text-gray-800">{agentData.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Total Applications</label>
                  <p className="mt-1 text-gray-800">{agentData.totalApplications}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Success Rate</label>
                  <p className="mt-1 text-gray-800">{agentData.successRate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Applications</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Universities
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {agentData.applications.map((application) => (
                  <tr 
                    key={application.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/admin/applications/${application.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {application.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.studentName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {application.universities.join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.dateSubmitted).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentView;