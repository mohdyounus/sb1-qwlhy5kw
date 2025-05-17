import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Application {
  id: string;
  agentId: string;
  studentName: string;
  universities: string[];
  status: 'Pending' | 'Under Review' | 'In Progress' | 'Awaiting Docs' | 'Submitted to University' | 'Approved' | 'Rejected';
  adminComments: string;
  lastUpdated: string;
  dateSubmitted: string;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'APP001',
      agentId: 'agent001',
      studentName: 'John Smith',
      universities: ['University of Auckland', 'AUT University'],
      status: 'Pending',
      adminComments: '',
      lastUpdated: '2024-03-15',
      dateSubmitted: '2024-03-15'
    },
    {
      id: 'APP002',
      agentId: 'agent002',
      studentName: 'Sarah Johnson',
      universities: ['University of Otago'],
      status: 'Approved',
      adminComments: 'All documents verified. Student meets requirements.',
      lastUpdated: '2024-03-16',
      dateSubmitted: '2024-03-14'
    }
  ]);

  const handleStatusUpdate = (applicationId: string, newStatus: Application['status'], comments: string) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: newStatus,
          adminComments: comments,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return app;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-indigo-100 text-indigo-800';
      case 'Awaiting Docs': return 'bg-orange-100 text-orange-800';
      case 'Submitted to University': return 'bg-purple-100 text-purple-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'Under Review':
      case 'In Progress': return <Clock className="w-5 h-5 text-blue-600" />;
      case 'Awaiting Docs': return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'Submitted to University': return <Clock className="w-5 h-5 text-purple-600" />;
      case 'Approved': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Rejected': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleRowClick = (applicationId: string) => {
    navigate(`/admin/applications/${applicationId}`);
  };

  const handleAgentClick = (e: React.MouseEvent, agentId: string) => {
    e.stopPropagation();
    navigate(`/admin/agents/${agentId}`);
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.agentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and review student applications
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by student name, agent ID, or application ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nz-blue focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <div className="sm:w-64 flex items-center">
            <Filter size={20} className="text-gray-400 mr-2" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nz-blue focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="under review">Under Review</option>
              <option value="in progress">In Progress</option>
              <option value="awaiting docs">Awaiting Docs</option>
              <option value="submitted to university">Submitted to University</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Application Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Universities & Courses
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comments & Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr 
                  key={application.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(application.id)}
                >
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-nz-blue">{application.id}</div>
                    <div className="text-sm text-gray-900">{application.studentName}</div>
                    <div className="text-xs text-gray-500">
                      Submitted: {new Date(application.dateSubmitted).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={(e) => handleAgentClick(e, application.agentId)}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {application.agentId}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <ul className="list-disc list-inside">
                      {application.universities.map((uni, index) => (
                        <li key={index}>{uni}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(application.status)}
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Updated: {new Date(application.lastUpdated).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <textarea
                      value={application.adminComments}
                      onChange={(e) => handleStatusUpdate(application.id, application.status, e.target.value)}
                      className="w-full mb-2 text-sm border border-gray-300 rounded-md p-2"
                      rows={2}
                      placeholder="Add comments..."
                    />
                    <select
                      value={application.status}
                      onChange={(e) => handleStatusUpdate(application.id, e.target.value as Application['status'], application.adminComments)}
                      className="w-full text-sm border border-gray-300 rounded-md p-2"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Awaiting Docs">Awaiting Docs</option>
                      <option value="Submitted to University">Submitted to University</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredApplications.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No applications found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;