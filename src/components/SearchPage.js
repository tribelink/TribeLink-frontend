import React, { useState, useContext } from 'react';
import { data } from '../data'; // Adjust the path as necessary
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ProviderModal from './ProviderModal'; // Import ProviderModal
import { CartContext } from '../contexts/cartContext'; // Import CartContext
import { toast } from 'react-toastify'; // Import toast for notifications

const Search = () => {
  const { addToCart } = useContext(CartContext); // Access addToCart function from context
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [selectedService, setSelectedService] = useState(null); // Store the selected service
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state

  // Flatten the service list from data
  const serviceList = data.flatMap(category =>
    category.subcategories.flatMap(sub => sub.services)
  );

  // Filter services based on search query
  const filteredServices = serviceList.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort services based on the sort order
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  // Open modal with selected service details
  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="bg-green-50 min-h-screen p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Search for Services</h1>

      {/* Search Box */}
      <div className="relative w-full max-w-md mx-auto mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for services..."
          className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Sort Options */}
      <div className="flex justify-center mb-4">
        <label htmlFor="sortOrder" className="mr-2">Sort By:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        >
          <option value="asc">Name (A-Z)</option>
          <option value="desc">Name (Z-A)</option>
        </select>
      </div>

      {/* Search Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedServices.length > 0 ? (
          sortedServices.map((service) => (
            <div
              key={service.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md cursor-pointer"
              onClick={() => openModal(service)} // Open modal on click
            >
              <h3 className="text-lg font-semibold text-green-700">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No services found</p>
        )}
      </div>

      {/* Provider Modal */}
      <ProviderModal
        selectedService={selectedService}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Search;
