import { Layers } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div>
        <div><div><Layers /><span>QueueFlow</span></div><p>Egypt's leading appointment and queue management platform.</p></div>
        <div><h4>PRODUCT</h4><ul><li><a href="#">Services</a></li><li><a href="#">Track Queue</a></li><li><a href="#">My Bookings</a></li></ul></div>
        <div><h4>COMPANY</h4><ul><li><a href="#">About Us</a></li><li><a href="#">Careers</a></li><li><a href="#">Contact</a></li></ul></div>
        <div><h4>LEGAL</h4><ul><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Service</a></li></ul></div>
      </div>
      <div>© 2026 QueueFlow. All rights reserved.</div>
    </footer>
  );
}