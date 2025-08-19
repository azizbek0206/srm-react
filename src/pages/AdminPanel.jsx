import { Outlet, NavLink } from 'react-router-dom';
import { getUserRole } from '../api/auth';

function AdminPanel() {
  const role = getUserRole();

  const navItems = [
    { path: '/admin', label: 'Dashboard' },
    ...(role === 'SuperAdmin' || role === 'Administrator'
      ? [
          { path: '/admin/courses', label: 'Courses' },
          { path: '/admin/groups', label: 'Groups' },
          { path: '/admin/payments', label: 'Payments' },
          { path: '/admin/attendance', label: 'Attendance' },
          { path: '/admin/exams', label: 'Exams' },
          { path: '/admin/messaging', label: 'Messaging' },
          { path: '/admin/tasks', label: 'Tasks' },
          { path: '/admin/settings', label: 'Settings' },
        ]
      : []),
    ...(role === 'Teacher'
      ? [
          { path: '/admin/groups', label: 'My Groups' },
          { path: '/admin/attendance', label: 'Attendance' },
          { path: '/admin/exams', label: 'Exams' },
          { path: '/admin/tasks', label: 'Tasks' },
        ]
      : []),
    ...(role === 'Accountant'
      ? [
          { path: '/admin/payments', label: 'Payments' },
          { path: '/admin/settings', label: 'Reports' },
        ]
      : []),
  ];

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-primary text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
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

export default AdminPanel;