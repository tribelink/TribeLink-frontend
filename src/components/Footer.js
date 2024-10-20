// src/components/Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        {/* Company Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">TribeLink</h3>
          <ul>
            <li><a href="/about" className="hover:text-gray-400 transition">About us</a></li>
            <li><a href="/terms" className="hover:text-gray-400 transition">Terms & conditions</a></li>
            <li><a href="/privacy" className="hover:text-gray-400 transition">Privacy policy</a></li>
            
          </ul>
        </div>

        {/* For Customers Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">For customers</h3>
          <ul>
            
            <li><a href="/categories" className="hover:text-gray-400 transition">Categories near you</a></li>
            <li><a href="/blog" className="hover:text-gray-400 transition">Blog</a></li>
            <li><a href="/contact" className="hover:text-gray-400 transition">Contact us</a></li>
          </ul>
        </div>

        {/* For Partners Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">For partners</h3>
          <ul>
            <li><a href="/register" className="hover:text-gray-400 transition">Register as a professional</a></li>
          </ul>
        </div>

        {/* Social Links Section */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Social links</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FontAwesomeIcon icon={faFacebookF} className="text-xl" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FontAwesomeIcon icon={faTwitter} className="text-xl" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FontAwesomeIcon icon={faInstagram} className="text-xl" />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition">
              <FontAwesomeIcon icon={faLinkedinIn} className="text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="text-center mt-4 text-sm">
        © Copyright 2024 TribeLink. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
