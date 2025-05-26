
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-nerds-darkgray text-white py-10 border-t border-nerds-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/fca6de80-801d-4784-9884-31b8324b4fe3.png" 
                alt="NerdsLab Logo" 
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold">
                <span className="text-nerds-yellow">NERDS</span>LAB
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Empowering the next generation of ethical hackers and cybersecurity professionals.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-nerds-yellow">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-nerds-yellow">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-nerds-yellow">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-nerds-yellow">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Learning Paths</h3>
            <ul className="space-y-2">
              <li><Link to="/tracks/ethical-hacking" className="text-gray-400 hover:text-nerds-yellow text-sm">Ethical Hacking</Link></li>
              <li><Link to="/tracks/penetration-testing" className="text-gray-400 hover:text-nerds-yellow text-sm">Penetration Testing</Link></li>
              <li><Link to="/tracks/advanced-pentesting" className="text-gray-400 hover:text-nerds-yellow text-sm">Advanced Pentesting</Link></li>
              <li><Link to="/certifications" className="text-gray-400 hover:text-nerds-yellow text-sm">Certifications</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources/tools" className="text-gray-400 hover:text-nerds-yellow text-sm">Tools & Downloads</Link></li>
              <li><Link to="/resources/guides" className="text-gray-400 hover:text-nerds-yellow text-sm">Guides & Cheatsheets</Link></li>
              <li><Link to="/resources/blog" className="text-gray-400 hover:text-nerds-yellow text-sm">Blog</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-nerds-yellow text-sm">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={16} />
                <span>support@nerdslab.in</span>
              </li>
            </ul>
            <div className="mt-4">
              <Link to="/contact" className="bg-nerds-yellow/20 hover:bg-nerds-yellow/30 text-nerds-yellow px-4 py-2 rounded-md text-sm font-medium inline-block">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-nerds-gray/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} NerdsLab Cyber Academy. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 hover:text-nerds-yellow text-sm">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-nerds-yellow text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
