import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../components/Shared/Navbar';

const Layout = () => {
    return (
        <div>
           <Navbar/>      


  <div className="drawer drawer-mobile">
  <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content ">
  <Outlet/>
    
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 text-base-content">
      
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/adduser">Add User</Link></li>
      <li><Link to="/showuser">Show User</Link></li>
    </ul>
  
  </div>
</div>
   
  
        </div>
    );
};

export default Layout;