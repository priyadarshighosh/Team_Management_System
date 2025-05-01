import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MemberDetails() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user');
        const foundMember = response.data.find(m => m._id === id);
        
        if (!foundMember) {
          throw new Error('Member not found');
        }
        
        setMember(foundMember);
        setError(null);
      } catch (err) {
        setError(err.message || 'Error fetching member details');
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

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
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <div className="flex items-center space-x-6">
            <img 
              src={member.profileImage ? `http://localhost:3001/${member.profileImage}` : '/default-avatar.jpg'} 
              alt={member.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold text-white">{member.name}</h1>
              <p className="text-blue-100">{member.degree}</p>
              <p className="text-blue-100 mt-1">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  REG: {member.registernumber}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Information
              </h2>
              <div className="space-y-2">
                <InfoItem label="Email" value={member.email} />
                <InfoItem label="Phone" value={member.phone} />
                <InfoItem label="Year of Study" value={`Year ${member.year}`} />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Certifications
              </h2>
              <div className="space-y-2">
                {member.certificate ? (
                  member.certificate.split(', ').map((cert, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-green-500">✓</span>
                      <span className="ml-2">{cert}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No certifications listed</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Internship Experience
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {member.internship || 'No internship experience listed'}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About Me
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {member.about || 'No description provided'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-gray-100">
    <span className="text-gray-500">{label}:</span>
    <span className="text-gray-700 font-medium">{value || 'N/A'}</span>
  </div>
);