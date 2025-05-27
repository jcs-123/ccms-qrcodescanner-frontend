import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaCamera, FaHome, FaQrcode, FaSearch } from 'react-icons/fa';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        <FaBars />
      </div>
      <nav>
        <ul>
          <li>
            <Link className="sidebar-link" to="/">
              <FaHome /> <span>Home</span>
            </Link>
          </li>
          <li>
            <Link className="sidebar-link" to="/get-data">
               <FaQrcode /> <span>Generate QR</span>
            </Link>
          </li>
          <li>
  <Link className="sidebar-link" to="/qr-scanner">
    <FaCamera /> <span>Scan QR</span>
  </Link>
</li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
