import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--primary-dark)] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                <Globe className="text-[var(--primary)]" size={20} />
              </div>
              <div className="ml-2">
                <div className="text-lg font-bold">Dream Scopes</div>
                <div className="text-xs opacity-80">Educational & Immigration Consultancy</div>
              </div>
            </div>
            <p className="text-sm opacity-90 mb-4">
              Your trusted partner for educational opportunities in New Zealand. 
              We help students achieve their academic dreams overseas.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--background)] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--background)] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[var(--background)] transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/course-finder" className="opacity-80 hover:opacity-100 transition-opacity">
                  Course Finder
                </Link>
              </li>
              <li>
                <Link to="/universities" className="opacity-80 hover:opacity-100 transition-opacity">
                  Universities
                </Link>
              </li>
              <li>
                <Link to="/scholarships" className="opacity-80 hover:opacity-100 transition-opacity">
                  Scholarships
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="opacity-80">University Admission</li>
              <li className="opacity-80">Visa Consultation</li>
              <li className="opacity-80">Scholarship Guidance</li>
              <li className="opacity-80">Exam Preparation</li>
              <li className="opacity-80">Career Counseling</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin size={18} className="mt-0.5 mr-2 flex-shrink-0" />
                <span className="opacity-80">123 Education Street, Auckland, New Zealand</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <a href="tel:+6499999999" className="opacity-80 hover:opacity-100 transition-opacity">
                  +64 9 999 9999
                </a>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a href="mailto:info@dreamscopes.com" className="opacity-80 hover:opacity-100 transition-opacity">
                  info@dreamscopes.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Dream Scopes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;