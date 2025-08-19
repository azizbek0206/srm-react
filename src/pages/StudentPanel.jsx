import { Outlet, NavLink } from 'react-router-dom';

function StudentPanel() {
  const navItems = [
    { path: '/student/profile', label: 'Profile' },
    { path: '/student/payments', label: 'Payments' },
    { path: '/student/attendance', label: 'Attendance' },
    { path: '/student/exams', label: 'Exams' },
    { path: '/student/tasks', label: 'Tasks' },
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-primary text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Student Panel</h2>
        <nav>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block py-2 px-4 rounded-md mb-2 ${isActive ? 'bg-secondary' : 'hover:bg-blue-800'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex-grow p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default StudentPanel;