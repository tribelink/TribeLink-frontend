import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { data } from '../data';
import ProviderModal from './ProviderModal'; 

const ServicePage = () => {
  const { categoryId } = useParams();
  const category = data.find(cat => cat.id === categoryId);

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubcategoryClick = (sub) => {
    setSelectedSubcategory(sub);
    setSelectedService(null);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="flex flex-col md:flex-row p-6 bg-gray-50 min-h-screen">
      {/* Subcategories */}
      <div className="w-full md:w-1/4 mb-6 md:mb-0">
        <h2 className="text-2xl font-bold text-green-800 mb-4">{category.name} Services</h2>
        <div className="flex flex-col space-y-4">
          {category.subcategories.map(sub => (
            <div
              key={sub.id}
              onClick={() => handleSubcategoryClick(sub)}
              className={`flex items-center p-4 rounded-lg shadow-md transition cursor-pointer 
                ${selectedSubcategory === sub ? 'bg-green-200' : 'bg-white'} hover:bg-green-100`}
            >
              <span className="text-3xl">{sub.icon}</span>
              <span className="ml-3 text-lg font-medium text-green-800">{sub.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div className="flex-1 ml-6">
        <h3 className="text-xl font-semibold mb-4">{selectedSubcategory ? selectedSubcategory.name : 'Select a Subcategory'}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedSubcategory ? (
            selectedSubcategory.services.map(service => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className="border rounded-lg p-4 shadow-md bg-white transition-transform cursor-pointer hover:shadow-lg hover:scale-105"
              >
                <span className="text-xl">{service.icon} {service.name}</span>
                <p className="mt-2 text-gray-600">Starting from: <strong>₹{service.lowestPrice}</strong></p>
                {service.discount && <span className="text-green-600">{service.discount}% Off</span>}
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full p-6 bg-gray-200 rounded-lg">
              <p className="text-gray-600 text-lg text-center">
                Please select a subcategory to view services.
                <br />
                <span className="font-semibold text-green-800">Explore and discover the best services available!</span>
              </p>
            </div>
          )}
        </div>
      </div>
      

      {/* Reusable Provider Modal */}
      <ProviderModal 
        selectedService={selectedService} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default ServicePage;
