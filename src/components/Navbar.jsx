import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserRole, logout } from '../api/auth';
import Button from './Button';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const role = getUserRole();

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    ...(isAuthenticated && role !== 'Student'
      ? [{ path: '/admin', label: 'Admin Panel' }]
      : []),
    ...(isAuthenticated && role === 'Student'
      ? [{ path: '/student', label: 'Student Panel' }]
      : []),
  ];

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">EduMaster CRM</Link>
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="hover:text-secondary">
              {item.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>
          )}
        </div>
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-primary text-white p-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block py-2 hover:text-secondary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <Button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              variant="secondary"
              className="mt-2"
            >
              Logout
            </Button>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="secondary" className="mt-2">
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;