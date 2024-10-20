import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { data } from '../data';
import { gsap } from 'gsap';
import { Typewriter } from 'react-simple-typewriter';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCheckCircle, faUsers, faTools, faHeadset } from '@fortawesome/free-solid-svg-icons';
import ProviderModal from './ProviderModal';
import HeroSection from './heroSection';

const Home = () => {
  const categoryRefs = useRef([]);
  const [serviceList, setServiceList] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const serviceNames = data.flatMap(category =>
    category.subcategories.flatMap(sub => sub.services.map(service => service.name))
  );

  useEffect(() => {
    const services = data.flatMap(category =>
      category.subcategories.flatMap(sub => sub.services)
    );
    setServiceList(services);

    categoryRefs.current.forEach((ref) => {
      gsap.fromTo(ref,
        { scale: 1, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" },
        {
          scale: 1.05,
          boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
          duration: 0.3,
          paused: true,
          ease: "power1.out",
        }
      );

      ref.addEventListener('mouseenter', () => {
        gsap.to(ref, { scale: 1.05, boxShadow: "0 8px 40px rgba(0,0,0,0.2)", duration: 0.3 });
      });
      ref.addEventListener('mouseleave', () => {
        gsap.to(ref, { scale: 1, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", duration: 0.3 });
      });
    });

    return () => {
      categoryRefs.current.forEach((ref) => {
        if (ref) {
          ref.removeEventListener('mouseenter', () => { });
          ref.removeEventListener('mouseleave', () => { });
        }
      });
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredServices = serviceList.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-green-50 min-h-screen">
      <HeroSection />

      <div className="mt-10 flex justify-center mb-0">
            <div className="text-slate-700">
              <p className="text-lg font-semibold text-center">
                <span className="text-slate-500">Discover services like </span>
                <span className="relative inline-block px-4 py-2 bg-gradient-to-r from-green-400 via-green-500 to-green-400 text-white font-bold rounded-md shadow-lg">
                  <Typewriter
                    words={serviceNames}
                    loop={Infinity}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={3000}
                  />
                </span>
              </p>
            </div>
          </div>

      {/* Search Box */}
      <div className="relative h-64 flex justify-center items-center mt-0">
        <div className="relative w-3/4 sm:w-1/2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for services..."
            className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white shadow-md text-lg"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          {searchQuery && (
            <ul className="absolute left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-md mt-2 max-h-60 overflow-auto z-10">
              {filteredServices.length > 0 ? (
                filteredServices.map(service => (
                  <li
                    key={service.id}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleServiceSelect(service)} // Open modal on click
                  >
                    {service.name}
                  </li>
                ))
              ) : (
                <li className="p-3 text-gray-500">No services found</li>
              )}
            </ul>
          )}
        </div>
      </div>

      

      {/* Features Section */}
      <div className="flex justify-center mt-12 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-4/5">
          <div className="flex flex-col items-center p-6 rounded-lg bg-white shadow-lg transition-transform duration-200 hover:shadow-2xl">
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-600 text-3xl" />
            <h3 className="mt-2 text-lg font-semibold text-green-700">Quality Services</h3>
            <p className="text-gray-600 text-center">We provide top-notch services that meet your needs.</p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg bg-white shadow-lg transition-transform duration-200 hover:shadow-2xl">
            <FontAwesomeIcon icon={faUsers} className="text-green-600 text-3xl" />
            <h3 className="mt-2 text-lg font-semibold text-green-700">Community Support</h3>
            <p className="text-gray-600 text-center">Join a community that supports you in every way.</p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg bg-white shadow-lg transition-transform duration-200 hover:shadow-2xl">
            <FontAwesomeIcon icon={faTools} className="text-green-600 text-3xl" />
            <h3 className="mt-2 text-lg font-semibold text-green-700">Easy Booking</h3>
            <p className="text-gray-600 text-center">Book your services quickly and easily online.</p>
          </div>
          <div className="flex flex-col items-center p-6 rounded-lg bg-white shadow-lg transition-transform duration-200 hover:shadow-2xl">
            <FontAwesomeIcon icon={faHeadset} className="text-green-600 text-3xl" />
            <h3 className="mt-2 text-lg font-semibold text-green-700">24/7 Support</h3>
            <p className="text-gray-600 text-center">We're here to help you anytime, anywhere.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap mt-12 max-w-6xl mx-auto">
        <div className="w-full lg:w-1/2 p-6">
          <h3 className="text-2xl font-semibold mb-4 text-green-600">What are you looking for?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.map((category, index) => (
              <Link
                key={category.id}
                to={`/services/${category.id}`}
                className={`flex flex-col items-center p-6 rounded-3xl transition-shadow duration-200 bg-green-${index % 2 === 0 ? '100' : '200'} hover:shadow-xl`}
                ref={(el) => categoryRefs.current[index] = el}
              >
                <span className="text-4xl">{category.icon}</span>
                <span className="mt-2 text-lg font-medium text-green-700">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Top Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data[0].subcategories.flatMap(sub =>
              sub.services.map(service => (
                <div
                  key={service.id}
                  className="border border-gray-300 rounded-lg p-4 bg-white shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer"
                  onClick={() => handleServiceSelect(service)} // Open modal on click
                >
                  <div className="flex items-center mb-2">
                    <span className="text-3xl">{service.icon}</span>
                    <span className="ml-2 text-lg font-medium">{service.name}</span>
                  </div>
                  <p className="text-gray-600">Starting from: <span className="font-bold text-green-600">Rs.{service.lowestPrice}</span></p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Provider Modal */}
      <ProviderModal
        selectedService={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Home;
