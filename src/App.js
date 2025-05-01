import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AddMember from './pages/AddMember.jsx';
import ViewMembers from './pages/ViewMember.jsx';
import MemberDetails from './pages/MemberDetails.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation */}
        <nav className="bg-gray-800 p-4">
          <div className="container mx-auto flex space-x-4">
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            <Link to="/add-member" className="text-white hover:text-gray-300">Add Member</Link>
            <Link to="/view-members" className="text-white hover:text-gray-300">View Members</Link>
          </div>
        </nav>

        {/* Page Content */}
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-member" element={<AddMember />} />
            <Route path="/view-members" element={<ViewMembers />} />
            <Route path="/members/:id" element={<MemberDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;