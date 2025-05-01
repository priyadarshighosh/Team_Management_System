import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user');
        setMembers(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">All Members</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Profile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Register Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Degree</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img 
                    src={member.profileImage ? `http://localhost:3001/${member.profileImage}` : '/default-avatar.jpg'} 
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.registernumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.degree}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/members/${member._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}