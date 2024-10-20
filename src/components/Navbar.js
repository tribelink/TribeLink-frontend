import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useState({ city: '', state: '' });

  // Function to toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to fetch the user's current location using Geolocation API
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        await getCityStateFromCoordinates(latitude, longitude);
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  // Function to reverse geocode the latitude and longitude using Google Maps API
  const getCityStateFromCoordinates = async (lat, lng) => {
    const apiKey = 'AIzaSyCtwSNvISu7c-8Hwl3RzEZjeVCcxnb7XKU'; 
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const city = addressComponents.find(comp => comp.types.includes('locality'))?.long_name || 'Unknown City';
        const state = addressComponents.find(comp => comp.types.includes('administrative_area_level_1'))?.long_name || 'Unknown State';

        setLocation({ city, state });
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  // Fetch the user's location on component mount
  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <nav className="bg-green-800 text-white shadow-lg">
      <div className="flex justify-between items-center p-4 md:px-8">
        {/* Logo and location */}
        <div className="flex items-center">
          <div className="text-lg font-bold mr-4">TribeLink</div>
          <div className="hidden sm:flex items-center">
            <i className="fas fa-map-marker-alt text-white mr-2"></i>
            <div className="bg-green-700 text-white p-2 rounded">
              {location.city ? `${location.city}, ${location.state}` : 'Fetching location...'}
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="hover:text-green-300 transition duration-150 ease-in-out">Home</Link>
          <Link to="/service" className="hover:text-green-300 transition duration-150 ease-in-out">Services</Link>
          <Link to="/about" className="hover:text-green-300 transition duration-150 ease-in-out">About Us</Link>
          <Link to="/search" className="flex items-center hover:text-green-300 transition duration-150 ease-in-out">
            <i className="fas fa-search mr-1"></i>
            <span>Search</span>
          </Link>
          <Link to="/cart" className="hover:text-green-300 transition duration-150 ease-in-out">
            <i className="fas fa-shopping-cart"></i>
          </Link>
          <Link to="/account" className="hover:text-green-300 transition duration-150 ease-in-out">
            <i className="fas fa-user"></i>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-green-700 text-white p-4">
          <Link to="/" className="block mb-2 hover:text-green-300 transition duration-150 ease-in-out" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/service" className="block mb-2 hover:text-green-300 transition duration-150 ease-in-out" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link to="/about" className="block mb-2 hover:text-green-300 transition duration-150 ease-in-out" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          <Link to="/search" className="block mb-2 flex items-center hover:text-green-300 transition duration-150 ease-in-out" onClick={() => setIsMobileMenuOpen(false)}>
            <i className="fas fa-search mr-1"></i>
            <span>Search</span>
          </Link>
          <Link to="/cart" className="block mb-2 hover:text-green-300 transition duration-150 ease-in-out" onClick={() => setIsMobileMenuOpen(false)}>
            <i className="fas fa-shopping-cart"></i>
          </Link>
          <Link to="/account" className="block hover:text-green-300 transition duration-150 ease-in-out" onClick={() => setIsMobileMenuOpen(false)}>
            <i className="fas fa-user"></i>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
