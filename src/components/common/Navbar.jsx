import { Layers } from 'lucide-react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="header">
      <div>
        <div><Layers /></div>
        <span>QueueFlow</span>
      </div>

      <nav className="nav-links">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/services"}>Services</NavLink>
        <NavLink to={"/my-bookings"}>My Bookings</NavLink>
      </nav>

      <div className="header-actions">
        <NavLink to={"/login"}>Sign In</NavLink>
        <NavLink to={"/services"}>Get Started</NavLink>
      </div>
    </header>
  );
}