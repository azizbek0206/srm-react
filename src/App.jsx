import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import CoursesAdmin from './pages/CoursesAdmin';
import { getToken, getUserRole } from './api/auth';
import AdminTable from './components/AdminTable';
import Button from './components/Button';
import Card from './components/Card';
import Header from './components/header';
import Loader from './components/Loader';
import Modal from './components/Modal';
import Notification from './components/Notification';



// Protected Route component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = getToken();
  const role = getUserRole();
  if (!token) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" />;
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  // Check authentication status on mount
  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['SuperAdmin', 'Administrator', 'Teacher', 'Accountant']}>
                <AdminPanel />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminTable />} />
            <Route path="button" element={<Button />} />
            <Route path="footer" element={<Footer />} />
            <Route path="card" element={<Card />} />
            <Route path="header" element={<Header />} />
            <Route path="loader" element={<Loader />} />
            <Route path="modal" element={<Modal />} />
            <Route path="navbar" element={<Navbar />} />
            <Route path="notification" element={<Notification />} />
            <Route path="courses" element={<CoursesAdmin />} />
          </Route>

          {/* Student Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                {/* <StudentPanel /> */}
              </ProtectedRoute>
            }
          >
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;