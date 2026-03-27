import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/employees', label: 'Employees' },
  { to: '/projects', label: 'Projects' },
  { to: '/tasks', label: 'Tasks' },
];

export default function ResponsiveNavbar() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const closeSidebar = () => setIsMobileSidebarOpen(false);
  const toggleSidebar = () => setIsMobileSidebarOpen((prev) => !prev);

  return (
    <div className="app-shell">
      <header className="mobile-header">
        <button
          type="button"
          className="mobile-menu-button"
          onClick={toggleSidebar}
          aria-label="Open navigation menu"
        >
          ☰
        </button>
        <div className="mobile-header-title">Project Management Dashboard</div>
      </header>

      {isMobileSidebarOpen && (
        <div className="mobile-overlay" onClick={closeSidebar} />
      )}

      <aside className={`sidebar ${isMobileSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-top">
          <div>
            <div className="brand">PM Dashboard</div>
          </div>

          <button
            type="button"
            className="sidebar-close-button"
            onClick={closeSidebar}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        <nav className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={closeSidebar}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="main-section">
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}