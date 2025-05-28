import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaCamera, FaHome, FaQrcode } from 'react-icons/fa';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const closeSidebarOnMobile = () => {
    if (isMobile) setCollapsed(false);
  };

  return (
    <>
      {isMobile && (
        <div
          className="mobile-toggle-btn"
          onClick={toggleSidebar}
          style={{ marginTop: '10px', padding: '10px', fontSize: '1.5rem', cursor: 'pointer' }}
        >
          <FaBars />
        </div>
      )}

      <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
        {!isMobile && (
          <div className="toggle-btn" onClick={toggleSidebar}>
            <FaBars />
          </div>
        )}

        <nav>
          <ul>
            <li>
              <Link className="sidebar-link" to="/" onClick={closeSidebarOnMobile}>
                <FaHome /> <span className='ms-2'>Home</span>
              </Link>
            </li>
            <li>
              <Link className="sidebar-link" to="/get-data" onClick={closeSidebarOnMobile}>
                <FaQrcode /> <span className='ms-2'>Generate QR</span>
              </Link>
            </li>
            <li>
              <Link className="sidebar-link" to="/qr-scanner" onClick={closeSidebarOnMobile}>
                <FaCamera /> <span className='ms-2'>Scan QR</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
